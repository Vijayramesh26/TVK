package newsletter

import (
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"

	"tvk-backend/helpers"
	"tvk-backend/models"
	"tvk-backend/services"

	"github.com/go-playground/validator/v10"
)

type NewsletterAPIHandler struct {
	svc *services.BusinessService
}

func NewNewsletterAPIHandler(pSvc *services.BusinessService) *NewsletterAPIHandler {
	return &NewsletterAPIHandler{svc: pSvc}
}

type CreateSubRequestStruct struct {
	Email string `json:"email" validate:"required,email"`
}

/*
Purpose   : Handles newsletter subscription via standard 5-step pattern.
Parameter : lHttpWriter (http.ResponseWriter), lHttpRequest (*http.Request)
Response  : Writes JSON success message.

On Success:
===========
Returns subscription confirmation.

On Error:
=========
Returns error message formatted with standard error code.

Author       : VIJAY
Created Date : 16-05-2026
*/
func (h *NewsletterAPIHandler) SubscribeAPIMethod(lHttpWriter http.ResponseWriter, lHttpRequest *http.Request) {
	log.Println("SubscribeAPIMethod (+)")

	var lResponseRec models.ResponseStruct
	lResponseRec.ResponseArr = []models.ResponseArr{}

	if lHttpRequest.Method == http.MethodPost {
		// 1. COLLECT
		var lRequestData CreateSubRequestStruct
		lErr := h.CollectMethod(lHttpRequest, &lRequestData)
		if lErr != nil {
			log.Println("SubscribeAPIMethod:001 - Error in CollectMethod:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_NNC_001 - Error in request collection: " + lErr.Error()
			goto Complete
		}

		// 2. VALIDATE
		lErr = h.ValidateMethod(lRequestData)
		if lErr != nil {
			log.Println("SubscribeAPIMethod:002 - Validation failed:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_NNV_002 - Validation failed: " + lErr.Error()
			goto Complete
		}

		// 3. CONSTRUCT
		lSubRecord, lErr := h.ConstructMethod(lRequestData)
		if lErr != nil {
			log.Println("SubscribeAPIMethod:003 - Construction error:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_NNC_003 - Data construction failed: " + lErr.Error()
			goto Complete
		}

		// 4. COMMUNICATE
		lErr = h.CommunicateMethod(lSubRecord)
		if lErr != nil {
			log.Println("SubscribeAPIMethod:004 - Communication error:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_NNC_004 - Communication failure: " + lErr.Error()
			goto Complete
		}

		lResponseRec.ResponseArr = append(lResponseRec.ResponseArr, models.ResponseArr{
			Message: "Successfully subscribed to TVK newsletter",
		})
		lResponseRec.Status = "Success"
	} else {
		lResponseRec.Status = "Error"
		lResponseRec.ErrMsg = "ERR_NNC_005 - Method Not Allowed"
	}

Complete:
	h.CompleteMethod(lResponseRec, lHttpWriter)
	log.Println("SubscribeAPIMethod (-)")
}

func (h *NewsletterAPIHandler) CollectMethod(lHttpRequest *http.Request, lRequestData *CreateSubRequestStruct) error {
	log.Println("NewsCollectMethod (+)")
	defer log.Println("NewsCollectMethod (-)")

	lBody, lErr := io.ReadAll(lHttpRequest.Body)
	if lErr != nil {
		return errors.New("failed to read request body")
	}
	if lErr = json.Unmarshal(lBody, lRequestData); lErr != nil {
		return errors.New("failed to unmarshal request data")
	}
	return nil
}

func (h *NewsletterAPIHandler) ValidateMethod(lRequestData CreateSubRequestStruct) error {
	log.Println("NewsValidateMethod (+)")
	defer log.Println("NewsValidateMethod (-)")

	lValidate := validator.New()
	if lErr := lValidate.Struct(lRequestData); lErr != nil {
		return errors.New("request validation failed: " + lErr.Error())
	}
	return nil
}

func (h *NewsletterAPIHandler) ConstructMethod(lRequestData CreateSubRequestStruct) (*models.Subscriber, error) {
	log.Println("NewsConstructMethod (+)")
	defer log.Println("NewsConstructMethod (-)")

	return &models.Subscriber{
		Email: lRequestData.Email,
	}, nil
}

func (h *NewsletterAPIHandler) CommunicateMethod(pSub *models.Subscriber) error {
	log.Println("NewsCommunicateMethod (+)")
	defer log.Println("NewsCommunicateMethod (-)")

	return h.svc.ProcessSubscriberMethod(pSub)
}

func (h *NewsletterAPIHandler) CompleteMethod(lResponseRec models.ResponseStruct, lHttpWriter http.ResponseWriter) {
	log.Println("NewsCompleteMethod (+)")
	defer log.Println("NewsCompleteMethod (-)")

	lStatus := http.StatusOK
	if lResponseRec.Status == "Error" {
		lStatus = http.StatusBadRequest
	}

	helpers.SendResponseMethod(lHttpWriter, lStatus, lResponseRec)
}

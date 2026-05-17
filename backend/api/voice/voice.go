package voice

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

type VoiceAPIHandler struct {
	svc *services.BusinessService
}

func NewVoiceAPIHandler(pSvc *services.BusinessService) *VoiceAPIHandler {
	return &VoiceAPIHandler{svc: pSvc}
}

type CreateIdeaRequestStruct struct {
	Name        string `json:"name"        validate:"required"`
	Phone       string `json:"phone"       validate:"required"`
	District    string `json:"district"    validate:"required"`
	Category    string `json:"category"    validate:"required"`
	Description string `json:"description" validate:"required"`
}

type CreateGrievanceRequestStruct struct {
	Name        string `json:"name"        validate:"required"`
	Phone       string `json:"phone"       validate:"required"`
	District    string `json:"district"    validate:"required"`
	Category    string `json:"category"    validate:"required"`
	Priority    string `json:"priority"    validate:"required"`
	Description string `json:"description" validate:"required"`
}

/*
Purpose   : Handles citizen policy idea submission via standard 5-step pattern.
Parameter : lHttpWriter (http.ResponseWriter), lHttpRequest (*http.Request)
Response  : Writes JSON result with tracking ID.

On Success:
===========
Returns tracking ID and success status.

On Error:
=========
Returns error message with standard code.

Author       : VIJAY
Created Date : 16-05-2026
*/
func (h *VoiceAPIHandler) SubmitIdeaAPIMethod(lHttpWriter http.ResponseWriter, lHttpRequest *http.Request) {
	log.Println("SubmitIdeaAPIMethod (+)")

	var lResponseRec models.ResponseStruct
	lResponseRec.ResponseArr = []models.ResponseArr{}

	if lHttpRequest.Method == http.MethodPost {
		// 1. COLLECT
		var lRequestData CreateIdeaRequestStruct
		lErr := h.CollectIdeaMethod(lHttpRequest, &lRequestData)
		if lErr != nil {
			log.Println("SubmitIdeaAPIMethod:001 - Error in CollectIdeaMethod:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_OOC_001 - Error in request collection: " + lErr.Error()
			goto Complete
		}

		// 2. VALIDATE
		lErr = h.ValidateIdeaMethod(lRequestData)
		if lErr != nil {
			log.Println("SubmitIdeaAPIMethod:002 - Validation failed:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_OOV_002 - Validation failed: " + lErr.Error()
			goto Complete
		}

		// 3. CONSTRUCT
		lIdeaRecord, lErr := h.ConstructIdeaMethod(lRequestData)
		if lErr != nil {
			log.Println("SubmitIdeaAPIMethod:003 - Construction error:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_OOC_003 - Data construction failed: " + lErr.Error()
			goto Complete
		}

		// 4. COMMUNICATE
		lTrackingID, lErr := h.CommunicateIdeaMethod(lIdeaRecord)
		if lErr != nil {
			log.Println("SubmitIdeaAPIMethod:004 - Communication error:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_OOC_004 - Communication failure: " + lErr.Error()
			goto Complete
		}

		lResponseRec.ResponseArr = append(lResponseRec.ResponseArr, models.ResponseArr{
			TrackingID: lTrackingID,
			Message:    "Idea submitted successfully",
		})
		lResponseRec.Status = "Success"
	} else {
		lResponseRec.Status = "Error"
		lResponseRec.ErrMsg = "ERR_OOC_005 - Method Not Allowed"
	}

Complete:
	h.CompleteMethod(lResponseRec, lHttpWriter)
	log.Println("SubmitIdeaAPIMethod (-)")
}

/*
Purpose   : Handles citizen grievance registration via standard 5-step pattern.
Parameter : lHttpWriter (http.ResponseWriter), lHttpRequest (*http.Request)
Response  : Writes JSON result with tracking ID.

On Success:
===========
Returns tracking ID and success status.

On Error:
=========
Returns error message with standard code.

Author       : VIJAY
Created Date : 16-05-2026
*/
func (h *VoiceAPIHandler) SubmitGrievanceAPIMethod(lHttpWriter http.ResponseWriter, lHttpRequest *http.Request) {
	log.Println("SubmitGrievanceAPIMethod (+)")

	var lResponseRec models.ResponseStruct
	lResponseRec.ResponseArr = []models.ResponseArr{}

	if lHttpRequest.Method == http.MethodPost {
		// 1. COLLECT
		var lRequestData CreateGrievanceRequestStruct
		lErr := h.CollectGrievanceMethod(lHttpRequest, &lRequestData)
		if lErr != nil {
			log.Println("SubmitGrievanceAPIMethod:001 - Error in CollectGrievanceMethod:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_GGC_001 - Error in request collection: " + lErr.Error()
			goto Complete
		}

		// 2. VALIDATE
		lErr = h.ValidateGrievanceMethod(lRequestData)
		if lErr != nil {
			log.Println("SubmitGrievanceAPIMethod:002 - Validation failed:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_GGV_002 - Validation failed: " + lErr.Error()
			goto Complete
		}

		// 3. CONSTRUCT
		lGrievRecord, lErr := h.ConstructGrievanceMethod(lRequestData)
		if lErr != nil {
			log.Println("SubmitGrievanceAPIMethod:003 - Construction error:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_GGC_003 - Data construction failed: " + lErr.Error()
			goto Complete
		}

		// 4. COMMUNICATE
		lTrackingID, lErr := h.CommunicateGrievanceMethod(lGrievRecord)
		if lErr != nil {
			log.Println("SubmitGrievanceAPIMethod:004 - Communication error:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_GGC_004 - Communication failure: " + lErr.Error()
			goto Complete
		}

		lResponseRec.ResponseArr = append(lResponseRec.ResponseArr, models.ResponseArr{
			TrackingID: lTrackingID,
			Message:    "Grievance registered successfully",
		})
		lResponseRec.Status = "Success"
	} else {
		lResponseRec.Status = "Error"
		lResponseRec.ErrMsg = "ERR_GGC_005 - Method Not Allowed"
	}

Complete:
	h.CompleteMethod(lResponseRec, lHttpWriter)
	log.Println("SubmitGrievanceAPIMethod (-)")
}

// --- Step Functions for Idea ---
func (h *VoiceAPIHandler) CollectIdeaMethod(lHttpRequest *http.Request, lRequestData *CreateIdeaRequestStruct) error {
	log.Println("IdeaCollectMethod (+)")
	defer log.Println("IdeaCollectMethod (-)")

	lBody, lErr := io.ReadAll(lHttpRequest.Body)
	if lErr != nil {
		return errors.New("failed to read request body")
	}
	if lErr = json.Unmarshal(lBody, lRequestData); lErr != nil {
		return errors.New("failed to unmarshal request data")
	}
	return nil
}

func (h *VoiceAPIHandler) ValidateIdeaMethod(lRequestData CreateIdeaRequestStruct) error {
	log.Println("IdeaValidateMethod (+)")
	defer log.Println("IdeaValidateMethod (-)")

	lValidate := validator.New()
	if lErr := lValidate.Struct(lRequestData); lErr != nil {
		return errors.New("request validation failed: " + lErr.Error())
	}
	return nil
}

func (h *VoiceAPIHandler) ConstructIdeaMethod(lRequestData CreateIdeaRequestStruct) (*models.Idea, error) {
	log.Println("IdeaConstructMethod (+)")
	defer log.Println("IdeaConstructMethod (-)")

	return &models.Idea{
		Name:        lRequestData.Name,
		Phone:       lRequestData.Phone,
		District:    lRequestData.District,
		Category:    lRequestData.Category,
		Description: lRequestData.Description,
	}, nil
}

func (h *VoiceAPIHandler) CommunicateIdeaMethod(pIdea *models.Idea) (string, error) {
	log.Println("IdeaCommunicateMethod (+)")
	defer log.Println("IdeaCommunicateMethod (-)")

	return h.svc.ProcessIdeaMethod(pIdea)
}

// --- Step Functions for Grievance ---
func (h *VoiceAPIHandler) CollectGrievanceMethod(lHttpRequest *http.Request, lRequestData *CreateGrievanceRequestStruct) error {
	log.Println("GrievCollectMethod (+)")
	defer log.Println("GrievCollectMethod (-)")

	lBody, lErr := io.ReadAll(lHttpRequest.Body)
	if lErr != nil {
		return errors.New("failed to read request body")
	}
	if lErr = json.Unmarshal(lBody, lRequestData); lErr != nil {
		return errors.New("failed to unmarshal request data")
	}
	return nil
}

func (h *VoiceAPIHandler) ValidateGrievanceMethod(lRequestData CreateGrievanceRequestStruct) error {
	log.Println("GrievValidateMethod (+)")
	defer log.Println("GrievValidateMethod (-)")

	lValidate := validator.New()
	if lErr := lValidate.Struct(lRequestData); lErr != nil {
		return errors.New("request validation failed: " + lErr.Error())
	}
	return nil
}

func (h *VoiceAPIHandler) ConstructGrievanceMethod(lRequestData CreateGrievanceRequestStruct) (*models.Grievance, error) {
	log.Println("GrievConstructMethod (+)")
	defer log.Println("GrievConstructMethod (-)")

	return &models.Grievance{
		Name:        lRequestData.Name,
		Phone:       lRequestData.Phone,
		District:    lRequestData.District,
		Category:    lRequestData.Category,
		Priority:    lRequestData.Priority,
		Description: lRequestData.Description,
	}, nil
}

func (h *VoiceAPIHandler) CommunicateGrievanceMethod(pGriev *models.Grievance) (string, error) {
	log.Println("GrievCommunicateMethod (+)")
	defer log.Println("GrievCommunicateMethod (-)")

	return h.svc.ProcessGrievanceMethod(pGriev)
}

func (h *VoiceAPIHandler) CompleteMethod(lResponseRec models.ResponseStruct, lHttpWriter http.ResponseWriter) {
	log.Println("VoiceCompleteMethod (+)")
	defer log.Println("VoiceCompleteMethod (-)")

	lStatus := http.StatusOK
	if lResponseRec.Status == "Error" {
		lStatus = http.StatusBadRequest
	}

	helpers.SendResponseMethod(lHttpWriter, lStatus, lResponseRec)
}

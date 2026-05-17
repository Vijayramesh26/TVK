package volunteer

import (
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"
	"strings"

	"tvk-backend/helpers"
	"tvk-backend/models"
	"tvk-backend/services"

	"github.com/go-playground/validator/v10"
)

type VolunteerAPIHandler struct {
	svc *services.BusinessService
}

func NewVolunteerAPIHandler(pSvc *services.BusinessService) *VolunteerAPIHandler {
	return &VolunteerAPIHandler{svc: pSvc}
}

type CreateVolunteerRequestStruct struct {
	Name     string   `json:"name"     validate:"required"`
	Phone    string   `json:"phone"    validate:"required"`
	Age      int      `json:"age"      validate:"required,gte=18,lte=100"`
	Gender   string   `json:"gender"   validate:"required"`
	District string   `json:"district" validate:"required"`
	Booth    string   `json:"booth"`
	Skills   []string `json:"skills"`
}

/*
Purpose   : Handles volunteer registration via standard 5-step pattern.
Parameter : lHttpWriter (http.ResponseWriter), lHttpRequest (*http.Request)
Response  : Writes JSON registration result with member ID.

On Success:
===========
Returns generated member ID and success status.

On Error:
=========
Returns error message formatted with standard error code.

Author       : VIJAY
Created Date : 16-05-2026
*/
func (h *VolunteerAPIHandler) RegisterAPIMethod(lHttpWriter http.ResponseWriter, lHttpRequest *http.Request) {
	log.Println("RegisterAPIMethod (+)")

	var lResponseRec models.ResponseStruct
	lResponseRec.ResponseArr = []models.ResponseArr{}

	if lHttpRequest.Method == http.MethodPost {
		// 1. COLLECT
		var lRequestData CreateVolunteerRequestStruct
		lErr := h.CollectMethod(lHttpRequest, &lRequestData)
		if lErr != nil {
			log.Println("RegisterAPIMethod:001 - Error in CollectMethod:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_VVC_001 - Error in request collection: " + lErr.Error()
			goto Complete
		}

		// 2. VALIDATE
		lErr = h.ValidateMethod(lRequestData)
		if lErr != nil {
			log.Println("RegisterAPIMethod:002 - Validation failed:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_VVV_002 - Validation failed: " + lErr.Error()
			goto Complete
		}

		// 3. CONSTRUCT
		lVolRecord, lErr := h.ConstructMethod(lRequestData)
		if lErr != nil {
			log.Println("RegisterAPIMethod:003 - Construction error:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_VVC_003 - Data construction failed: " + lErr.Error()
			goto Complete
		}

		// 4. COMMUNICATE
		lMemberID, lErr := h.CommunicateMethod(lVolRecord)
		if lErr != nil {
			log.Println("RegisterAPIMethod:004 - Communication error:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_VVC_004 - Communication failure: " + lErr.Error()
			goto Complete
		}

		lResponseRec.ResponseArr = append(lResponseRec.ResponseArr, models.ResponseArr{
			MemberID: lMemberID,
			Message:  "Volunteer registered successfully",
		})
		lResponseRec.Status = "Success"
	} else {
		lResponseRec.Status = "Error"
		lResponseRec.ErrMsg = "ERR_VVC_005 - Method Not Allowed"
	}

Complete:
	h.CompleteMethod(lResponseRec, lHttpWriter)
	log.Println("RegisterAPIMethod (-)")
}

func (h *VolunteerAPIHandler) CollectMethod(lHttpRequest *http.Request, lRequestData *CreateVolunteerRequestStruct) error {
	log.Println("VolCollectMethod (+)")
	defer log.Println("VolCollectMethod (-)")

	lBody, lErr := io.ReadAll(lHttpRequest.Body)
	if lErr != nil {
		return errors.New("failed to read request body")
	}
	if lErr = json.Unmarshal(lBody, lRequestData); lErr != nil {
		return errors.New("failed to unmarshal request data")
	}
	return nil
}

func (h *VolunteerAPIHandler) ValidateMethod(lRequestData CreateVolunteerRequestStruct) error {
	log.Println("VolValidateMethod (+)")
	defer log.Println("VolValidateMethod (-)")

	lValidate := validator.New()
	if lErr := lValidate.Struct(lRequestData); lErr != nil {
		return errors.New("request validation failed: " + lErr.Error())
	}
	return nil
}

func (h *VolunteerAPIHandler) ConstructMethod(lRequestData CreateVolunteerRequestStruct) (*models.Volunteer, error) {
	log.Println("VolConstructMethod (+)")
	defer log.Println("VolConstructMethod (-)")

	lSkillsStr := strings.Join(lRequestData.Skills, ", ")
	return &models.Volunteer{
		Name:     lRequestData.Name,
		Phone:    lRequestData.Phone,
		Age:      lRequestData.Age,
		Gender:   lRequestData.Gender,
		District: lRequestData.District,
		Booth:    lRequestData.Booth,
		Skills:   lSkillsStr,
	}, nil
}

func (h *VolunteerAPIHandler) CommunicateMethod(pVol *models.Volunteer) (string, error) {
	log.Println("VolCommunicateMethod (+)")
	defer log.Println("VolCommunicateMethod (-)")

	return h.svc.ProcessVolunteerMethod(pVol)
}

func (h *VolunteerAPIHandler) CompleteMethod(lResponseRec models.ResponseStruct, lHttpWriter http.ResponseWriter) {
	log.Println("VolCompleteMethod (+)")
	defer log.Println("VolCompleteMethod (-)")

	lStatus := http.StatusOK
	if lResponseRec.Status == "Error" {
		lStatus = http.StatusBadRequest
	}

	helpers.SendResponseMethod(lHttpWriter, lStatus, lResponseRec)
}

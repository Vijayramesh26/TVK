package stats

import (
	"encoding/json"
	"log"
	"net/http"

	"tvk-backend/helpers"
	"tvk-backend/models"
	"tvk-backend/services"
)

type StatsAPIHandler struct {
	svc *services.BusinessService
}

func NewStatsAPIHandler(pSvc *services.BusinessService) *StatsAPIHandler {
	return &StatsAPIHandler{svc: pSvc}
}

/*
Purpose   : Handles HTTP GET request to fetch global platform statistics.
Parameter : lHttpWriter (http.ResponseWriter), lHttpRequest (*http.Request)
Response  : Writes standard JSON response envelope.

On Success:
===========
Returns active counts of ideas, grievances, volunteers, and subscribers.

On Error:
=========
Returns error details in standard format.

Author       : VIJAY
Created Date : 16-05-2026
*/
func (h *StatsAPIHandler) StatsAPIMethod(lHttpWriter http.ResponseWriter, lHttpRequest *http.Request) {
	log.Println("StatsAPIMethod (+)")

	var lResponseRec models.ResponseStruct
	lResponseRec.ResponseArr = []models.ResponseArr{}

	if lHttpRequest.Method == http.MethodGet {
		// 1. COLLECT (Not required for GET stats)

		// 2. VALIDATE (Not required for GET stats)

		// 3. CONSTRUCT (Not required for GET stats)

		// 4. COMMUNICATE
		lStatsMap, lErr := h.CommunicateMethod()
		if lErr != nil {
			log.Println("StatsAPIMethod:001 - Error in CommunicateMethod:", lErr)
			lResponseRec.Status = "Error"
			lResponseRec.ErrMsg = "ERR_SSC_001 - Failed to fetch statistics: " + lErr.Error()
			goto Complete
		}

		lResponseRec.ResponseArr = append(lResponseRec.ResponseArr, models.ResponseArr{
			Count:   lStatsMap["ideasCount"].(int),
			Message: "Statistics retrieved successfully",
		})
		lResponseRec.Status = "Success"
	} else {
		lResponseRec.Status = "Error"
		lResponseRec.ErrMsg = "ERR_SSC_002 - Method Not Allowed"
	}

Complete:
	h.CompleteMethod(lResponseRec, lHttpWriter)
	log.Println("StatsAPIMethod (-)")
}

func (h *StatsAPIHandler) CommunicateMethod() (map[string]interface{}, error) {
	log.Println("StatsCommunicateMethod (+)")
	defer log.Println("StatsCommunicateMethod (-)")
	return h.svc.GetStatsMethod()
}

func (h *StatsAPIHandler) CompleteMethod(lResponseRec models.ResponseStruct, lHttpWriter http.ResponseWriter) {
	log.Println("StatsCompleteMethod (+)")
	defer log.Println("StatsCompleteMethod (-)")

	lStatus := http.StatusOK
	if lResponseRec.Status == "Error" {
		lStatus = http.StatusBadRequest
	}

	helpers.SendResponseMethod(lHttpWriter, lStatus, lResponseRec)
}

/*
Purpose   : Wraps GET stats into standard envelope format.
Parameter : lHttpWriter (http.ResponseWriter), lHttpRequest (*http.Request)
Response  : Writes envelope JSON.

On Success:
===========
Returns envelope JSON.

On Error:
=========
None.

Author       : VIJAY
Created Date : 16-05-2026
*/
func (h *StatsAPIHandler) StatsEnvelopeAPIMethod(lHttpWriter http.ResponseWriter, lHttpRequest *http.Request) {
	log.Println("StatsEnvelopeAPIMethod (+)")
	defer log.Println("StatsEnvelopeAPIMethod (-)")

	lStatsMap, lErr := h.svc.GetStatsMethod()
	if lErr != nil {
		lHttpWriter.WriteHeader(http.StatusInternalServerError)
		return
	}

	lHttpWriter.Header().Set("Content-Type", "application/json")
	json.NewEncoder(lHttpWriter).Encode(map[string]interface{}{
		"status": "S",
		"code":   200,
		"data":   lStatsMap,
		"meta": map[string]interface{}{
			"requestId": lHttpRequest.Header.Get("X-Request-ID"),
			"timestamp": timeNowISO(),
		},
	})
}

func timeNowISO() string {
	return "2026-05-16T23:00:00Z"
}

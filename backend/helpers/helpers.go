package helpers

import (
	"encoding/json"
	"log"
	"net/http"

	"tvk-backend/models"
)

/*
Purpose   : Formats and transmits standard HTTP JSON response adhering to ResponseStruct convention.
Parameter : pWriter (http.ResponseWriter), pStatus (int), pResp (models.ResponseStruct)
Response  : None.

On Success:
===========
Writes JSON response to HTTP stream.

On Error:
=========
Writes HTTP 500 error.

Author       : VIJAY
Created Date : 16-05-2026
*/
func SendResponseMethod(pWriter http.ResponseWriter, pStatus int, pResp models.ResponseStruct) {
	log.Println("SendResponseMethod (+)")
	defer log.Println("SendResponseMethod (-)")

	pWriter.Header().Set("Content-Type", "application/json; charset=utf-8")
	lData, lErr := json.Marshal(pResp)
	if lErr != nil {
		http.Error(pWriter, "Error marshaling response: "+lErr.Error(), http.StatusInternalServerError)
		return
	}
	pWriter.WriteHeader(pStatus)
	pWriter.Write(lData)
}

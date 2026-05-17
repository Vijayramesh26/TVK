package middleware

import (
	"log"
	"net/http"
	"time"
)

type responseWriterObserver struct {
	http.ResponseWriter
	status int
}

func (w *responseWriterObserver) WriteHeader(code int) {
	w.status = code
	w.ResponseWriter.WriteHeader(code)
}

/*
Purpose   : Intercepts HTTP requests to log inbound and outbound lifecycle events.
Parameter : pNext (http.Handler)
Response  : Returns wrapped HTTP handler.

On Success:
===========
Logs inbound parameters and outbound status with execution duration.

On Error:
=========
None.

Author       : VIJAY
Created Date : 16-05-2026
*/
func RequestLoggerMiddleware(pNext http.Handler) http.Handler {
	return http.HandlerFunc(func(lW http.ResponseWriter, lR *http.Request) {
		lStartTime := time.Now().UTC()
		lReqID := lR.Header.Get("X-Request-ID")
		lIP := lR.RemoteAddr
		lUA := lR.UserAgent()

		log.Printf("[INBOUND]  %s | %s %s | IP: %s | ReqID: %s | UA: %s\n",
			lStartTime.Format(time.RFC3339), lR.Method, lR.URL.Path, lIP, lReqID, lUA)

		lWriter := &responseWriterObserver{ResponseWriter: lW, status: http.StatusOK}

		pNext.ServeHTTP(lWriter, lR)

		lDuration := time.Since(lStartTime)
		log.Printf("[OUTBOUND] %s | %s %s | Status: %d | Duration: %v | ReqID: %s\n",
			time.Now().UTC().Format(time.RFC3339), lR.Method, lR.URL.Path, lWriter.status, lDuration, lReqID)
	})
}

package middleware

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
)

/*
Purpose   : Applies CORS headers, panic recovery, request ID injection, and context timeout.
Parameter : pNext (http.Handler)
Response  : Returns chained HTTP handler.

On Success:
===========
Protects downstream handlers with context timeouts and error recovery.

On Error:
=========
Catches panics and returns HTTP 500 cleanly.

Author       : VIJAY
Created Date : 16-05-2026
*/
func CommonMiddleware(pNext http.Handler) http.Handler {
	return http.HandlerFunc(func(lW http.ResponseWriter, lR *http.Request) {
		// 1. CORS Headers
		lW.Header().Set("Access-Control-Allow-Origin", "*")
		lW.Header().Set("Access-Control-Allow-Credentials", "true")
		lW.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
		lW.Header().Set("Access-Control-Allow-Headers", "USER, Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Request-ID, Idempotency-Key")

		if lR.Method == http.MethodOptions {
			lW.WriteHeader(http.StatusOK)
			return
		}

		// 2. Request ID Injection
		lReqID := lR.Header.Get("X-Request-ID")
		if lReqID == "" {
			lReqID = uuid.New().String()
			lR.Header.Set("X-Request-ID", lReqID)
		}
		lW.Header().Set("X-Request-ID", lReqID)

		// 3. Panic Recovery
		defer func() {
			if lRec := recover(); lRec != nil {
				log.Printf("CRITICAL PANIC RECOVERED: %v\n", lRec)
				http.Error(lW, fmt.Sprintf("ERR_SYS_500 - Internal Server Error: %v", lRec), http.StatusInternalServerError)
			}
		}()

		// 4. Context Timeout (30 seconds)
		lCtx, lCancel := context.WithTimeout(lR.Context(), 30*time.Second)
		defer lCancel()

		pNext.ServeHTTP(lW, lR.WithContext(lCtx))
	})
}

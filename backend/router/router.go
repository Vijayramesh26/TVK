package router

import (
	"log"
	"net/http"

	"tvk-backend/api/newsletter"
	"tvk-backend/api/stats"
	"tvk-backend/api/voice"
	"tvk-backend/api/volunteer"
	"tvk-backend/middleware"
	"tvk-backend/services"

	"github.com/gorilla/mux"
)

/*
Purpose   : Initializes Gorilla Mux router with all registered v1 API endpoints and middleware.
Parameter : pSvc (*services.BusinessService)
Response  : Returns fully configured http.Handler.

On Success:
===========
Registers route paths and wraps router with logging and common middleware.

On Error:
=========
None.

Author       : VIJAY
Created Date : 16-05-2026
*/
func InitRouterMethod(pSvc *services.BusinessService) http.Handler {
	log.Println("InitRouterMethod (+)")
	defer log.Println("InitRouterMethod (-)")

	lMux := mux.NewRouter().StrictSlash(true)

	// API Handlers
	lStatsAPI := stats.NewStatsAPIHandler(pSvc)
	lVoiceAPI := voice.NewVoiceAPIHandler(pSvc)
	lVolunteerAPI := volunteer.NewVolunteerAPIHandler(pSvc)
	lNewsletterAPI := newsletter.NewNewsletterAPIHandler(pSvc)

	// v1 Routes Prefix
	lV1Router := lMux.PathPrefix("/api/v1").Subrouter()

	lV1Router.HandleFunc("/stats", lStatsAPI.StatsAPIMethod).Methods(http.MethodGet, http.MethodOptions)
	lV1Router.HandleFunc("/voice/idea", lVoiceAPI.SubmitIdeaAPIMethod).Methods(http.MethodPost, http.MethodOptions)
	lV1Router.HandleFunc("/voice/grievance", lVoiceAPI.SubmitGrievanceAPIMethod).Methods(http.MethodPost, http.MethodOptions)
	lV1Router.HandleFunc("/volunteer/register", lVolunteerAPI.RegisterAPIMethod).Methods(http.MethodPost, http.MethodOptions)
	lV1Router.HandleFunc("/newsletter", lNewsletterAPI.SubscribeAPIMethod).Methods(http.MethodPost, http.MethodOptions)

	// Wrap with Middleware
	lHandlerWithLogger := middleware.RequestLoggerMiddleware(lMux)
	lHandlerWithCommon := middleware.CommonMiddleware(lHandlerWithLogger)

	return lHandlerWithCommon
}

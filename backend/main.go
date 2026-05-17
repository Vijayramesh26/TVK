//go:build !wasm

package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"tvk-backend/config"
	"tvk-backend/repository"
	"tvk-backend/router"
	"tvk-backend/services"
)

/*
Purpose   : Entry point for TVK Golang backend server implementing graceful shutdown.
Parameter : None
Response  : None.

On Success:
===========
Starts HTTP server and listens for OS signals to shutdown gracefully.

On Error:
=========
Logs initialization failures.

Author       : VIJAY
Created Date : 16-05-2026
*/
func main() {
	log.Println("main (+)")
	defer log.Println("main (-)")

	// 1. Load Config
	lCfg := config.LoadConfigMethod()

	// 2. Init DB Connection
	if lErr := config.InitDBMethod(lCfg); lErr != nil {
		log.Fatalf("ERR_SYS_001 - Failed to initialize database: %v", lErr)
	}

	lSqlDb, _ := config.GOpenDBConnection.DB()
	defer lSqlDb.Close()

	// 3. Init Repository & Migrate
	lRepo := repository.NewRepository(config.GOpenDBConnection)
	if lErr := lRepo.MigrateSchemasMethod(); lErr != nil {
		log.Fatalf("ERR_SYS_002 - Schema migration failed: %v", lErr)
	}

	// 4. Init Business Service
	lSvc := services.NewBusinessService(lRepo)

	// 5. Init Router with Middleware
	lHandler := router.InitRouterMethod(lSvc)

	lServer := &http.Server{
		Addr:    ":" + lCfg.Port,
		Handler: lHandler,
	}

	// Start server in goroutine
	go func() {
		fmt.Printf("🛡️ TVK Enterprise Golang Server running on http://localhost:%s/api/v1\n", lCfg.Port)
		if lErr := lServer.ListenAndServe(); lErr != nil && lErr != http.ErrServerClosed {
			log.Fatalf("main: server error: %v", lErr)
		}
	}()

	// Wait for OS signal for Graceful Shutdown
	lQuit := make(chan os.Signal, 1)
	signal.Notify(lQuit, syscall.SIGINT, syscall.SIGTERM)
	<-lQuit

	log.Println("Shutting down server gracefully...")
	lCtx, lCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer lCancel()

	if lErr := lServer.Shutdown(lCtx); lErr != nil {
		log.Printf("Server forced to shutdown: %v\n", lErr)
	}

	log.Println("TVK Server stopped perfectly.")
}

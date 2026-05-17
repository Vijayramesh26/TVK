//go:build wasm

package main

import (
	"log"
	"syscall/js"

	"tvk-backend/config"
	"tvk-backend/repository"
	"tvk-backend/router"
	"tvk-backend/services"
)

func main() {
	log.Println("WasmMain (+)")
	defer log.Println("WasmMain (-)")

	lCfg := config.LoadConfigMethod()
	_ = config.InitDBMethod(lCfg)

	lRepo := repository.NewRepository(nil)
	lSvc := services.NewBusinessService(lRepo)
	lHandler := router.InitRouterMethod(lSvc)

	// Expose HTTP Handler to Javascript global scope
	js.Global().Set("handleWasmRequest", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if lHandler != nil {
			return true
		}
		return false
	}))

	log.Println("TVK WebAssembly Worker Runtime active.")
	select {}
}

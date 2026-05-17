//go:build wasm

package config

import (
	"log"
	"gorm.io/gorm"
)

var GOpenDBConnection *gorm.DB

type Config struct {
	Port string
}

func LoadConfigMethod() Config {
	log.Println("WasmLoadConfigMethod (+)")
	defer log.Println("WasmLoadConfigMethod (-)")
	return Config{Port: "8080"}
}

func InitDBMethod(pCfg Config) error {
	log.Println("WasmInitDBMethod (+)")
	defer log.Println("WasmInitDBMethod (-)")
	GOpenDBConnection = nil
	return nil
}

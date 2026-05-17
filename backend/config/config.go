//go:build !wasm

package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var GOpenDBConnection *gorm.DB

type Config struct {
	Port               string
	DBDialect          string
	DBHost             string
	DBPort             string
	DBUser             string
	DBPassword         string
	DBName             string
	MaxOpenConnections int
	MaxIdleConnections int
}

/*
Purpose   : Loads application configuration from environment variables.
Parameter : None
Response  : Returns populated Config struct.

On Success:
===========
Returns configuration struct.

On Error:
=========
None.

Author       : VIJAY
Created Date : 16-05-2026
*/
func LoadConfigMethod() Config {
	log.Println("LoadConfigMethod (+)")
	defer log.Println("LoadConfigMethod (-)")

	lPort := os.Getenv("PORT")
	if lPort == "" {
		lPort = "8080"
	}

	lDialect := os.Getenv("DB_DIALECT")
	if lDialect == "" {
		lDialect = "sqlite"
	}

	lDBName := os.Getenv("DB_NAME")
	if lDBName == "" {
		lDBName = "tvk_prod.db"
	}

	return Config{
		Port:               lPort,
		DBDialect:          lDialect,
		DBName:             lDBName,
		MaxOpenConnections: 25,
		MaxIdleConnections: 10,
	}
}

/*
Purpose   : Initializes database connection and sets pool parameters.
Parameter : pCfg (Config)
Response  : Returns error if connection fails.

On Success:
===========
Populates global GOpenDBConnection variable.

On Error:
=========
Returns connection error.

Author       : VIJAY
Created Date : 16-05-2026
*/
func InitDBMethod(pCfg Config) error {
	log.Println("InitDBMethod (+)")
	defer log.Println("InitDBMethod (-)")

	var lDb *gorm.DB
	var lErr error

	switch pCfg.DBDialect {
	case "sqlite":
		lDb, lErr = gorm.Open(sqlite.Open(pCfg.DBName), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Silent),
		})
	default:
		lDb, lErr = gorm.Open(sqlite.Open(pCfg.DBName), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Silent),
		})
	}

	if lErr != nil {
		return fmt.Errorf("ERR_DB_001 - database connection failed: %w", lErr)
	}

	lSqlDb, lErr := lDb.DB()
	if lErr != nil {
		return fmt.Errorf("ERR_DB_002 - failed to get sql db: %w", lErr)
	}

	lSqlDb.SetMaxOpenConns(pCfg.MaxOpenConnections)
	lSqlDb.SetMaxIdleConns(pCfg.MaxIdleConnections)
	lSqlDb.SetConnMaxLifetime(5 * time.Minute)

	GOpenDBConnection = lDb
	return nil
}

package services

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
)

/*
Purpose   : Reads JSON file from disk into target struct.
Parameter : pPath (string), pTarget (interface{})
Response  : Returns error if read fails.

On Success:
===========
Unmarshals file contents into target struct.

On Error:
=========
Returns file open or JSON decode error.

Author       : VIJAY
Created Date : 16-05-2026
*/
func ReadJSONMethod(pPath string, pTarget interface{}) error {
	log.Println("ReadJSONMethod (+)")
	defer log.Println("ReadJSONMethod (-)")

	lFile, lErr := os.Open(pPath)
	if lErr != nil {
		return fmt.Errorf("ERR_FILE_001 - failed to open file: %w", lErr)
	}
	defer lFile.Close()

	lBytes, lErr := io.ReadAll(lFile)
	if lErr != nil {
		return fmt.Errorf("ERR_FILE_002 - failed to read file: %w", lErr)
	}

	if lErr := json.Unmarshal(lBytes, pTarget); lErr != nil {
		return fmt.Errorf("ERR_FILE_003 - failed to decode json: %w", lErr)
	}

	return nil
}

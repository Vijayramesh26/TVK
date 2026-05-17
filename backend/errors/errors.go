package errors

import "log"

const (
	ErrAuthTokenMissing  = "ERR_AUTH_001"
	ErrAuthTokenInvalid  = "ERR_AUTH_002"
	ErrUserNotFound      = "ERR_USR_001"
	ErrUserEmailRequired = "ERR_USR_002"
	ErrDBConnection      = "ERR_DB_001"

	// Volunteer Error Codes
	ErrVolCollect   = "ERR_VVC_001"
	ErrVolValidate  = "ERR_VVV_002"
	ErrVolConstruct = "ERR_VVC_003"
	ErrVolComm      = "ERR_VVC_004"

	// Voice Error Codes
	ErrVoiceCollect   = "ERR_OOC_001"
	ErrVoiceValidate  = "ERR_OOV_002"
	ErrVoiceConstruct = "ERR_OOC_003"
	ErrVoiceComm      = "ERR_OOC_004"

	// Stats Error Codes
	ErrStatsComm = "ERR_SSC_001"

	// Newsletter Error Codes
	ErrNewsCollect   = "ERR_NNC_001"
	ErrNewsValidate  = "ERR_NNV_002"
	ErrNewsConstruct = "ERR_NNC_003"
	ErrNewsComm      = "ERR_NNC_004"
)

/*
Purpose   : Logs and formats standardized error strings.
Parameter : pErrCode (string), pMsg (string)
Response  : Returns formatted error string.

On Success:
===========
Returns error string formatted with code.

On Error:
=========
None.

Author       : VIJAY
Created Date : 16-05-2026
*/
func FormatErrorMethod(pErrCode string, pMsg string) string {
	log.Println("FormatErrorMethod (+)")
	defer log.Println("FormatErrorMethod (-)")
	return pErrCode + " - " + pMsg
}

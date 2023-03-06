package outboundAcp

import (
	"fmt"
	"time"
)

var tokenCached string = ""
var tokenEpoch int64 = 0
var tokenTTL int64 = 60 * 60 * 1000 // 1 hour

func AuthnAcpWrapper() (string, error) {

	if tokenEpoch > time.Now().UnixMilli() {
		fmt.Println("AuthnAcp Token Cached")
		return tokenCached, nil
	}

	token, tokenError := AuthnAcpClientSecretBasic()
	// token, tokenError := AuthnAcpClientSecretPost()

	tokenCached = token
	tokenEpoch = time.Now().UnixMilli() + tokenTTL
	return token, tokenError
}

func getCachedToken() (string, bool) {
	if tokenEpoch < time.Now().UnixMilli() {
		return tokenCached, true
	} else {
		return "", false
	}
}

package inbound

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/outboundAcp"
	"github.com/gin-gonic/gin"
)

func AbortAuthn(c *gin.Context) {

	fmt.Println("----- AbortAcpAuthn")
	c.Header("Access-Control-Allow-Origin", "https://localhost:3000")
	inboundData, inboundDataErr := ioutil.ReadAll(c.Request.Body)
	if inboundDataErr != nil {
		log.Fatal(inboundDataErr)
	}

	inboundJson := string(inboundData)
	fmt.Println("inboundJson: ", inboundJson)

	acpToken, acpErr := outboundAcp.AuthnAcpWrapper()
	if acpErr != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
	}

	abortBody, abortErr := outboundAcp.AbortAcpAuthn(inboundJson, acpToken)
	if abortErr != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
	}

	fmt.Println("abortAcpAuthn Body: ", string(abortBody))
	c.Data(http.StatusOK, "application/json; charset=utf-8", abortBody)
}

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
		log.Print("AbortAuthn inboundDataErr:", inboundDataErr)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	inboundJson := string(inboundData)
	fmt.Println("inboundJson: ", inboundJson)

	acpToken, acpErr := outboundAcp.AuthnAcpWrapper()
	if acpErr != nil {
		log.Print("AuthnAcpWrapper acpErr:", acpErr)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	abortBody, abortErr := outboundAcp.AbortAcpAuthn(inboundJson, acpToken)
	if abortErr != nil {
		log.Print("AbortAcpAuthn abortErr:", abortErr)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	fmt.Println("abortAcpAuthn Body: ", string(abortBody))
	c.Data(http.StatusOK, "application/json; charset=utf-8", abortBody)
}

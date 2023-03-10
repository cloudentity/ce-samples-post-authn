package inbound

import (
	"fmt"
	"log"
	"net/http"

	"github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/outboundAcp"
	"github.com/gin-gonic/gin"
)

func AuthnAcp(c *gin.Context) {

	fmt.Println("----- AuthnAcp")
	acpToken, acpErr := outboundAcp.AuthnAcpWrapper()
	if acpErr != nil {
		log.Print("AuthnAcp acpErr:", acpErr)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	fmt.Println("AuthnAcp Token: ", acpToken)
	c.Data(http.StatusOK, "application/json; charset=utf-8", []byte(acpToken))
}

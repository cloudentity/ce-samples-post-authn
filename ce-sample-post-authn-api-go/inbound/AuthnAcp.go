package inbound

import (
	"fmt"
	"net/http"

	"github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/outboundAcp"
	"github.com/gin-gonic/gin"
)

func AuthnAcp(c *gin.Context) {

	fmt.Println("----- AuthnAcp")
	acpToken, acpErr := outboundAcp.AuthnAcpWrapper()
	if acpErr != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
	}

	fmt.Println("AuthnAcp Token: ", acpToken)
	c.Data(http.StatusOK, "application/json; charset=utf-8", []byte(acpToken))
}

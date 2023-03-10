package inbound

import (
	"fmt"
	"log"
	"net/http"

	"github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/outboundAcp"
	"github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/outboundCustom"
	"github.com/gin-gonic/gin"
	"github.com/tidwall/gjson"
)

// Get both ACP Session and Customer User Record
func GetSessionAndOrganizations(c *gin.Context) {

	fmt.Println("----- GetSessionAndOrganizations")
	c.Header("Access-Control-Allow-Origin", "https://localhost:3000")
	loginId := c.Query("login_id")
	loginState := c.Query("login_state")

	acpToken, acpErr := outboundAcp.AuthnAcpWrapper()
	if acpErr != nil {
		log.Print("AuthnAcpWrapper error:", acpErr)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	session, sessionErr := outboundAcp.GetAcpSession(loginId, loginState, acpToken)
	if sessionErr != nil {
		log.Print("GetAcpSession error:", sessionErr)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	userId := gjson.Get(session, "authentication_context.email").String()
	fmt.Println("userId: ", userId)

	userRecord, userIsFound := outboundCustom.GetCustomOrganizations(userId)
	fmt.Println("userRecord: ", userRecord)

	if userIsFound {
		c.IndentedJSON(http.StatusOK, userRecord)
	} else {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "user not found"})
	}
}

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

func CompleteAuthn(c *gin.Context) {

	fmt.Println("----- CompleteAuthn")
	c.Header("Access-Control-Allow-Origin", "https://localhost:3000")
	loginId := c.Query("loginId")
	loginState := c.Query("loginState")
	organizationId := c.Query("organizationId")

	acpToken, acpErr := outboundAcp.AuthnAcpWrapper()
	if acpErr != nil {
		log.Print("AuthnAcpWrapper error:", acpErr)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	session, sessonErr := outboundAcp.GetAcpSession(loginId, loginState, acpToken)
	if sessonErr != nil {
		log.Print("GetAcpSession error:", sessonErr)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	userId := gjson.Get(session, "authentication_context.email").String()
	fmt.Println("userId: ", userId)

	userRecord, userIsFound := outboundCustom.GetCustomOrganizations(userId)
	fmt.Println("userRecord: ", userRecord)

	if !userIsFound {
		log.Print(`User ${userId} not found in Custom Organizations`)
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	organization, organizationErr := outboundCustom.GetOrganizationFromUserRecord(organizationId, userRecord)
	if organizationErr != nil {
		log.Print("GetOrganizationFromUserRecord error:", organizationErr)
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	completeBody, completeErr := outboundAcp.CompleteAcpAuthn(organizationId, organization, loginId, loginState, acpToken)
	if completeErr != nil {
		log.Print("CompleteAcpAuthn error:", completeErr)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	fmt.Println("completeAcpAuthn Body: ", string(completeBody))
	c.Data(http.StatusOK, "application/json; charset=utf-8", completeBody)
}

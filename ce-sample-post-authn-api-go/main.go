package main

import (
	"github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/inbound"
	"github.com/gin-gonic/gin"
)

func main() {
	g := gin.Default()

	// Get both User Session from ACP and User Organizations from Customer API
	g.GET("/api/sessionAndOrganizations", inbound.GetSessionAndOrganizations)

	// Complete postAuthn request
	g.GET("/api/complete", inbound.CompleteAuthn)

	// Abort postAuthn request
	g.POST("/api/abort", inbound.AbortAuthn)

	// Verify ACP Authn for testing purposes
	g.GET("/api/authn", inbound.AuthnAcp)

	g.RunTLS(":8443", "./config/server.crt", "./config/server.key")
}

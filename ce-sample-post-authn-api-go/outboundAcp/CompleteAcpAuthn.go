package outboundAcp

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/config"
	"github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/outboundCustom"
)

func CompleteAcpAuthn(organizationId string, organization outboundCustom.Organization,
	loginId string, loginState string, acpToken string) ([]byte, error) {

	requestValues := map[string]interface{}{
		"id":          loginId,
		"login_state": loginState,
		"authentication_context": map[string]interface{}{
			"organizationId":   organizationId,
			"organizationName": organization.OrgName,
			"permissions":      organization.Permissions,
		},
	}

	requestJson, jsonErr := json.Marshal(requestValues)
	if jsonErr != nil {
		log.Fatal(jsonErr)
		return nil, jsonErr
	}
	fmt.Println("requestJson: ", string(requestJson))
	requestBody := strings.NewReader(string(requestJson))

	req, reqErr := http.NewRequest("POST", config.SystemApiUrl+"/post-authn/"+loginId+"/complete", requestBody)
	if reqErr != nil {
		log.Fatal(reqErr)
		return nil, reqErr
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+acpToken)

	// debug.LogRequest(req, "CompleteAcpAuthn")

	client := &http.Client{}
	resp, respErr := client.Do(req)
	if respErr != nil {
		log.Fatal(respErr)
		return nil, respErr
	}
	fmt.Println("completeAcpAuthn Status: ", resp.Status, resp.Body)

	defer resp.Body.Close()
	respBody, bodyErr := ioutil.ReadAll(resp.Body)
	if bodyErr != nil {
		log.Fatal(bodyErr)
	}

	return respBody, nil
}
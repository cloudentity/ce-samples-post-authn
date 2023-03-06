package outboundAcp

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/config"
	"github.com/tidwall/gjson"
)

func AbortAcpAuthn(inboundJson string, acpToken string) ([]byte, error) {

	loginId := gjson.Get(inboundJson, "id").String()
	fmt.Println("loginId: ", loginId)

	requestBody := strings.NewReader(inboundJson)
	req, reqErr := http.NewRequest("POST", config.SystemApiUrl+"/post-authn/"+loginId+"/abort", requestBody)
	if reqErr != nil {
		log.Fatal(reqErr)
		return nil, reqErr
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+acpToken)

	// debug.LogRequest(req, "AbortAcpAuthn")

	client := &http.Client{}
	resp, respErr := client.Do(req)
	if respErr != nil {
		log.Fatal(respErr)
		return nil, respErr
	}
	fmt.Println("AbortAcpAuthn Status: ", resp.Status)

	defer resp.Body.Close()
	respBody, bodyErr := ioutil.ReadAll(resp.Body)
	if bodyErr != nil {
		log.Fatal(bodyErr)
		return nil, bodyErr
	}

	return respBody, nil
}

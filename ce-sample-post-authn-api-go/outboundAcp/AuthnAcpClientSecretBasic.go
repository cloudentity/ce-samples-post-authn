package outboundAcp

import (
	b64 "encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/config"
)

func AuthnAcpClientSecretBasic() (string, error) {

	reqData := url.Values{}
	reqData.Set("grant_type", "client_credentials")
	reqBody := strings.NewReader(reqData.Encode())

	req, reqErr := http.NewRequest("POST", config.SystemAuthnUrl, reqBody)
	if reqErr != nil {
		log.Fatal(reqErr)
		return "", reqErr
	}

	credentials := config.AcpSecrets.ClientId + ":" + config.AcpSecrets.ClientSecret
	credentialsEncoded := b64.StdEncoding.EncodeToString([]byte(credentials))
	req.Header.Set("Authorization", "Basic "+credentialsEncoded)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	resp, respErr := client.Do(req)
	fmt.Println("AuthnAcpClientSecretBasic Status:", resp.Status)

	if respErr != nil {
		log.Fatal(respErr)
		return "", respErr
	}

	defer resp.Body.Close()
	respBody, bodyErr := ioutil.ReadAll(resp.Body)
	if bodyErr != nil {
		log.Fatal(bodyErr)
		return "", bodyErr
	}

	var respData map[string]interface{}
	jsonErr := json.Unmarshal([]byte(respBody), &respData)
	if jsonErr != nil {
		log.Fatal(jsonErr)
		return "", jsonErr
	}

	acpToken := respData["access_token"].(string)
	return acpToken, nil
}

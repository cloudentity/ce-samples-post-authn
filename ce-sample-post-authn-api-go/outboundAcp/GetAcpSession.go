package outboundAcp

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/config"
)

func GetAcpSession(loginId string, loginState string, acpToken string) (string, error) {

	req, reqErr := http.NewRequest("GET", config.SystemApiUrl+"/post-authn/"+loginId, nil)
	if reqErr != nil {
		log.Fatal(reqErr)
		return "", reqErr
	}

	req.Header.Set("Authorization", "Bearer "+acpToken)

	query := req.URL.Query()
	query.Add("login_state", loginState)
	req.URL.RawQuery = query.Encode()

	// debug.LogRequest(req, "GetAcpSession")

	client := &http.Client{}
	resp, respErr := client.Do(req)
	fmt.Println("GetAcpSession Status: " + resp.Status)

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

	if resp.StatusCode != 200 {
		fmt.Println("GetAcpSession error:")
		return "", errors.New(string(respBody))
	}

	var respData map[string]interface{}
	jsonErr := json.Unmarshal([]byte(respBody), &respData)
	if jsonErr != nil {
		log.Fatal(jsonErr)
		return "", jsonErr
	}

	session := string(respBody)
	return session, nil
}

package debug

import (
	"fmt"
	"net/http"
	"net/http/httputil"
)

func LogRequest(req *http.Request, name string) {
	requestDump, err := httputil.DumpRequest(req, true)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("-----", name)
	fmt.Println(string(requestDump))
	fmt.Println("-----", name)
}

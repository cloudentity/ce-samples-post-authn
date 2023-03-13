## ce-samples-post-authn-api-go

This module contains the server side API code written in GoLang.

### Functionality

- Provide server side authentication with ACP
- Package up ACP session and customer API response and return it to UI
- Stubbed out call to customer API
- Provide ACP getSession, completePostAuthn, abortPostAuthn
- Keep ACP and customer API credentials secret

### Configure Go

Create the Go source directory

```
mkdir ~/go/src/github.com
```

Add the following environment variables to your `~/.bash_profile`

```
export GOPRIVATE=github.com/cloudentity/*
export GOROOT=/usr/local/go
export GOPROXY=https://proxy.golang.org,direct
export GO111MODULE=on
export GOPATH=$HOME/go
```

Be sure to start a new shell so that the new environment variables are set.

### Clone the repo

```
cd ~/go/src/github.com
```

```
git clone git@github.com:cloudentity/ce-samples-post-authn.git
```

### Configure the IssuerUrl

In the ACP UI, get the `Issurer URL` from your application configuration 

https://cloudentity.com/developers/howtos/extensions/custom_apps/#register-application-in-cloudentity

In the `config/config.go` file, copy the `Issurer URL` into the `IssuerUrl`.

```
const IssuerUrl string = "https://[TENANT_ID].us.authz.cloudentity.io/[TENANT_ID]/system/oauth2/token"
```

### Configure the ApiUrl

In the `config/config.go` file, construct the ApiUrl using the following format.

```
https://[TENANT_ID].us.authz.cloudentity.io/api/system/[TENANT_ID]
```

In the `config/config.go` file, copy the constructed URL into the `ApiUrl`.

```
const ApiUrl string = "https://my-tenant.us.authz.cloudentity.io/api/system/my-tenant"
```

### Configure the Client ID and client Secret

In the ACP UI, get the Client ID and client Secret from your application configuration 

https://cloudentity.com/developers/howtos/extensions/custom_apps/#register-application-in-cloudentity

In the `config/secrets.go` file, copy the value into `ClientId` and `ClientSecret`.

```
	ClientId:     "12345678901234567890",
	ClientSecret: "qwertyuiopzxcvbnmasdfghjkl",
```

### Run the code

In shell, run the app.

```
./run.sh
```

Example output:
```
$ ./run.sh
Post-AuthN API
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:	export GIN_MODE=release
 - using code:	gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /api/sessionAndOrganizations --> github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/inbound.GetSessionAndOrganizations (3 handlers)
[GIN-debug] GET    /api/complete             --> github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/inbound.CompleteAuthn (3 handlers)
[GIN-debug] POST   /api/abort                --> github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/inbound.AbortAuthn (3 handlers)
[GIN-debug] GET    /api/authn                --> github.com/ce-samples-post-authn/ce-sample-post-authn-api-go/inbound.AuthnAcp (3 handlers)
[GIN-debug] Listening and serving HTTPS on :8443
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
```

### Test the App authentication with ACP

While the App is running, open a 2nd shell and call the AuthN test endpoint

```
curl -k https://localhost:8443/api/authn
```

Example output:

```
$ curl -k https://localhost:8443/api/authn
eyJhbGciOiJFUzI1NiIsImtpZCI6IjgyMDkxMjIwMTQzNDQ0ODE3MTc0ODE0MDMzNDAwNTE2NTExNDk1IiwidHlwIjoiSldU
...
```

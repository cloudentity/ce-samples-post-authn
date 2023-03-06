package config

type Secret struct {
	ClientId     string `json:"clientId"`
	ClientSecret string `json:"clientSecret"`
}

var AcpSecrets = Secret{
	ClientId:     "REDACTED",
	ClientSecret: "REDACTED",
}

package outboundCustom

type User struct {
	UserId        string         `json:"userId"`
	Organizations []Organization `json:"organizations"`
}

type Organization struct {
	OrgId       string   `json:"orgId"`
	OrgName     string   `json:"orgName"`
	Permissions []string `json:"permissions"`
}

var mockUsers = []User{
	{
		UserId: "test+corp@cloudentity.com",
		Organizations: []Organization{
			{
				OrgId:   "1001",
				OrgName: "Corporate Services",
				Permissions: []string{
					"corp:ViewDashboard",
					"corp:ViewDashboardSummaries",
				},
			},
			{
				OrgId:   "6502",
				OrgName: "Acme Inc.",
				Permissions: []string{
					"corp:ViewDashboard",
					"acme:ViewDashboard",
				},
			},
			{
				OrgId:   "6811",
				OrgName: "Wonka Industries",
				Permissions: []string{
					"corp:ViewDashboard",
					"wonka:ViewDashboard",
				},
			},
		},
	},
	{
		UserId: "test+acme@cloudentity.com",
		Organizations: []Organization{
			{
				OrgId:   "6502",
				OrgName: "Acme Inc.",
				Permissions: []string{
					"acme:ViewDashboard",
					"acme:CreateOrder",
					"acme:ViewOrder",
					"acme:ListOrders",
					"acme:TrackOrder",
					"acme:ConfirmOrder",
				},
			},
		},
	},
}

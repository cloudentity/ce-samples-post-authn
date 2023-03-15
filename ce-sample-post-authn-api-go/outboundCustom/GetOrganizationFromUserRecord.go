package outboundCustom

import "errors"

func GetOrganizationFromUserRecord(organizationId string, userRecord User) (Organization, error) {
	for _, org := range userRecord.Organizations {
		if org.OrgId == organizationId {
			return org, nil
		}
	}

	return Organization{}, errors.New("Requested organization not found")
}

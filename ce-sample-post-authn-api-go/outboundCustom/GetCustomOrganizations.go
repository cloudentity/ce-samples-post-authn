package outboundCustom

// TODO: Replace with call to Customer API to get User Organizations
func GetCustomOrganizations(userId string) (User, bool) {

	var userIsFound bool = false
	for _, userRecord := range mockUsers {
		if userRecord.UserId == userId {
			userIsFound = true
			return userRecord, userIsFound
		}
	}

	var userRecord User = User{}
	return userRecord, userIsFound
}

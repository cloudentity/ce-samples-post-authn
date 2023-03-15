## Configure ACP

### Create a test Identity Pool

For testing purposes, create a test Identity Pool

- In ACP Top Right Nav, click the Gear icon.
- Click `Identity Pools`
- Click `Create New`
- Enter `Name` and `Description` and click `Create`

### Add test users

- In ACP Top Right Nav, click the Gear icon.
- Click `Identity Pools`
- Click on your test `Identity Pool`
- Click `Add User` and add the following test users
  - test+corp@cloudentity.com
  - test+acme@cloudentity.com
  - test+noorg@cloudentity.com

### Add the Authentication Context attributes

- In ACP Left Nav, Click on `Auth Settings`
- Click `Create Attribute` and add the following atrributes
  - organizationName, Organization Name, String
  - organizationId, Organization ID, String
  - permissions, Permissions, List of strings

### Add the claims

- In ACP Left Nav, Click `Auth Settings`
- organizationId, AuthN Context, Organization ID, Profile
- organizationName, AuthN Context, Organization Name, Profile
- permissions, AuthN Context, Permissions, Profile

### Create the IDP connected to your Identity Pool

- In ACP Left Nav, Click `Identity Providers`
- Click `Create Connection`
- Click `Identity Pool`
- Click `Next`
- Enter an `Identity Provider Name`
- Click the new Identity Pool


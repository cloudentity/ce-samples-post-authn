## Test Use Cases

### User with multiple organizations, selection test.

- Go to the demo Application Login that has the Test Application associated to the IDP or Identity Pool.
- AuthN with test+corp@cloudentity.com
- Select an organization, click submit
- Verify claims organizationId, organizationName, permissions

### User with one organization, flow thru test.

- Go to the demo Application Login that has the Test Application associated to the IDP or Identity Pool.
- AuthN with test+acme@cloudentity.com
- Verify page is automatically redirected to the claims page
- Verify claims organizationId, organizationName, permissions

### User with zero organizations, display User Error

- Go to the demo Application Login that has the Test Application associated to the IDP or Identity Pool.
- AuthN with test+noorg@cloudentity.com
- Verify page displays an User Error page "Please ask your supervisor to assign an organization to your account."

### System failure, display System Error

- Go to https://localhost:3000/ without any parameters.
- Verify page displays an System Error page "Please contact support."

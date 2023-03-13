## ce-samples-post-authn-ui-react

The module contains the client side UI code written in React.

### Functionality

- User interface
- Calls to the backend API to get the current ACP session and customer's organization
- Contains logic for the following use cases
  - User has more then 1 organization
    - User is required to select one organization
    - User clicks submit
  - User has only 1 organization
    - System automatically sets user ogranization
    - System completes the authentication process
  - User does not exist in customer organizations
    - Display error directing user to next steps
  - System error
    - Display error

### Configure extension in ACP 

[Configure extension in ACP](https://cloudentity.com/developers/howtos/extensions/custom_apps/)

### Run the code

```
./run.sh
```

### Tools

[npm docs](README-npm.md)

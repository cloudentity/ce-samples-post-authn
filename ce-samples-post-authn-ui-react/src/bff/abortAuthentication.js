import { api } from '../api/api';

export default function abortAuthentication( status, error, errorDescription, loginId, loginState, setSystemError ) {

  const body = {
    "status": status,
    "error": error,
    "error_description": errorDescription,
    "id": loginId,
    "login_state": loginState,
  }

  api.abortAuthentication(body)
    .then(res => {
      if( res.redirect_to ) {
        // If you want your UI to return to the ACP failure page, add the following code
        // NOTE: The UserErrors will not be displayed
        // window.location.replace(res.redirect_to);
      } else {
        setSystemError("SystemError:RedirectNotFound:abortAuthentication",res);
      }
    })
    .catch(err => {
      if( err.response?.status && err.response?.status !== 200 ) {
        setSystemError("SystemError:UnexpectedResponse:abortAuthentication",`${err.response?.status} ${err.response?.statusText}`);
      } else {
        setSystemError("SystemError:UnexpectedResult:abortAuthentication",err);
      }
    });
}

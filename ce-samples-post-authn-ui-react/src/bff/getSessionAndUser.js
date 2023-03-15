import { api } from '../api/api';

export default function getSessionAndUser(loginId, loginState, setSession, setSessionLoading, setUserError, setSystemError) {

  if(!loginId || !loginState) {
    setSystemError("SystemError:MissingParameters:getSessionAndUser","Add login_id and login_state");
    return
  }

  const loginIdEnc = encodeURIComponent(loginId);
  const loginStateEnc = encodeURIComponent(loginState);
  const query = `login_id=${loginIdEnc}&login_state=${loginStateEnc}&scopes=manage_post_authn`

  setSessionLoading(true);
  api.getSessionAndUser(query)
    .then(res => {
      setSessionLoading(false);
      setSession(res)
    })
    .catch(err => {
      setSessionLoading(false);
      if( err.response?.status === 404 ) {
        setUserError("UserError:NoOrganizationsFound:getSessionAndUser","No organizations assigned","Please ask your supervisor to assign an organization to your account.");
      } else if( err.response?.status && err.response?.status !== 200 ) {
        setSystemError("SystemError:UnexpectedResponse:getSessionAndUser",`${err.response?.status} ${err.response?.statusText}`);
     } else {
        setSystemError("SystemError:UnexpectedResult:getSessionAndUser",`${err.response?.status} ${err.response?.statusText}`);
     }
    });
}

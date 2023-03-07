import { api } from '../api/api';

export default function getSessionAndUser(loginId, loginState, setSession, setSessionLoading, setUserError, setUserCorrection) {

  if(!loginId || !loginState) {
    throw new Error("Missing Parameters")
  }

  const loginIdEnc = encodeURIComponent(loginId);
  const loginStateEnc = encodeURIComponent(loginState);
  const query = `login_id=${loginIdEnc}&login_state=${loginStateEnc}&scopes=manage_post_authn`

  api.getSessionAndUser(query)
    .then(res => {
      setSessionLoading(false);
      console.log('getSessionAndUser Success:', res);
      setSession(res)
      setUserError( '' );
    })
    .catch(err => {
      setSessionLoading(false);
      console.log('getSessionAndUser Failure:', err.response?.status, err.response?.statusText);
      if( err.response?.status === 404 ) {
        setUserError("No organizations are assigned to you");
        setUserCorrection("Please ask your supervisor to assign an organization to your account.");
      } else {
        throw new Error(`${err.response?.status} ${err.response?.statusText}`)
      }
    });
}

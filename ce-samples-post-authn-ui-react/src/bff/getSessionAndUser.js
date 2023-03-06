//import { useEffect } from 'react'
import { api } from '../api/api';
//import abortAuthentication from './abortAuthentication';

export default function getSessionAndUser(loginId, loginState, setSession, setSessionLoading, setSessionError) {

  if(!loginId || !loginState) {
    throw new Error("Missing Parameters")
  }

  const loginIdEnc = encodeURIComponent(loginId);
  const loginStateEnc = encodeURIComponent(loginState);
  const query = `login_id=${loginIdEnc}&login_state=${loginStateEnc}&scopes=manage_post_authn`

  api.getSessionAndUser(query)
    .then(res => {
      console.log('getSessionAndUser:', res);
      setSession(res)
      setSessionError( '' );
      setSessionLoading(false);
    })
    .catch(err => {
      console.log('getSessionAndUser error:', err.response?.status, err.response?.statusText);
      setSessionError(`${err.response?.status} ${err.response?.statusText}`);
      setSessionLoading(false);
    });
}

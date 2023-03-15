import React from "react"
import { useQuery } from 'react-query';
import { api } from '../api/api';

export default function completeAuthentication( organizationId, userId, loginId, loginState, setSystemLoading, setSystemError ) {

  const organizationIdEncoded = encodeURIComponent(organizationId);
  const userIdEncoded = encodeURIComponent(userId);
  const query = `userId=${userIdEncoded}&organizationId=${organizationIdEncoded}&loginId=${loginId}&loginState=${loginState}`

  setSystemLoading(true)
  api.completeAuthentication(query)
    .then(res => {
      setSystemLoading(false);
      window.location.replace(res.redirect_to);
    })
    .catch(err => {
      if( err.response?.status && err.response?.status != 200 ) {
        setSystemError("SystemError:UnexpectedResponse:completeAuthentication",`${err.response?.status} ${err.response?.statusText}`);
       } else {
        setSystemError("SystemError:UnexpectedResult:completeAuthentication",err);
       }
    });
}

import React from "react"
import { useQuery } from 'react-query';
import { api } from '../api/api';

export default function completeAuthentication( organizationId, userId, loginId, loginState, setCompleteLoading, setCompleteError ) {

  const organizationIdEncoded = encodeURIComponent(organizationId);
  const userIdEncoded = encodeURIComponent(userId);
  const query = `userId=${userIdEncoded}&organizationId=${organizationIdEncoded}&loginId=${loginId}&loginState=${loginState}`

  setCompleteLoading(true)
  api.completeAuthentication(query)
    .then(res => {
      console.log('completeResponseJson:', res);
      setCompleteLoading(false);
      window.location.replace(res.redirect_to);
    })
    .catch(err => {
      console.log('API error:', err);
      setCompleteError('Error: unable to complete the Authentication process.');
      setCompleteLoading(false);
    });
}
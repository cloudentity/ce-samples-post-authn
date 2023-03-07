import React from "react"
import { useQuery } from 'react-query';
import { api } from '../api/api';

export default function abortAuthentication( status, error, errorDescription, loginId, loginState ) {

  console.log("Arrived abortAuthentication");

  const body = {
    "status": status,
    "error": error,
    "error_description": errorDescription,
    "id": loginId,
    "login_state": loginState,
  }

  console.log("abortAuthentication body: ", JSON.stringify(body, null, 2) );

  api.abortAuthentication(body)
    .then(res => {
      if( res.redirect_to ) {
        console.log('abortAuthentication Success:', res);

        // If you want your UI to return to the ACP failure page, add the following code
        // window.location.replace(res.redirect_to);
      } else {
        console.log('abortAuthentication Failure:', res)
        throw new Error("abortAuthentication failed")
      }
    })
    .catch(err => {
      console.log('abortAuthentication Failure:', err);
      throw new Error(`getSessionAndUser:${err.response.status} ${err.response?.body.message}`)
    });
}

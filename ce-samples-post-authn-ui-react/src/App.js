import React, { useState, useEffect } from 'react'

import getSessionAndUser from "./bff/getSessionAndUser"
import completeAuthentication from "./bff/completeAuthentication"

import Header from "./components/Header"
import UserError from "./errors/UserError"
import Loading from "./components/Loading"
import Organizations from "./components/Organizations"

let completeSemaphore = 0

export default  function App() {

  const queryParams = new URLSearchParams(window.location.search)
  const loginId = queryParams.get("login_id")
  const loginState = queryParams.get("login_state")

  const [session, setSession] = useState([]);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [completeLoading, setCompleteLoading] = useState(true);
  const [completeError, setCompleteError] = useState("");
  const [organizationId, setOrganizationId] = useState("")
  const [userError, setUserError] = useState("");
  const [userCorrection, setUserCorrection] = useState("");

  useEffect(() => {
    console.log("Call getSessionAndUser");
    getSessionAndUser( loginId, loginState, setSession, setSessionLoading, setUserError, setUserCorrection );
  }, []);

  const handleSubmit = () => {
    const organizationIdSet = ( organizationId === "" ) ? session.organizations.filter((v,i) => i === 0)[0].orgId : organizationId
    console.log("Submit",session.userId,organizationIdSet)
    completeAuthentication( organizationIdSet, session.userId, loginId, loginState, setCompleteLoading, setCompleteError )
  }

  console.log( "sessionLoading: ",sessionLoading)
  console.log( "session: ",session)

  if( !sessionLoading && session && session.organizations && session.organizations.length === 1 && (++completeSemaphore === 1)) {
    handleSubmit()
  }

  return (
    <>
     <Header />
     <UserError loading={sessionLoading} error={userError} correction={userCorrection}/>
     <Loading loading={sessionLoading} />
     <Organizations
       loading={sessionLoading}
       error={userError}
       session={session}
       organizationId={organizationId}
       onChange={setOrganizationId}
       submit={handleSubmit}
     />
    </>
  );
}



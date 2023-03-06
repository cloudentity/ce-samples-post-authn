import React, { useState, useEffect } from 'react'

import getSessionAndUser from "./bff/getSessionAndUser"
import completeAuthentication from "./bff/completeAuthentication"
import abortAuthentication from './bff/abortAuthentication';

import Header from "./components/Header"
import Loading from "./components/Loading"
import ErrorSession from "./errors/ErrorSession"
import SelectOrganization from "./components/SelectOrganization"
import OrganizationSelection from "./components/OrganizationSelection"
import Debug from "./components/Debug"

let completeSemaphore = 0

export default  function App() {

  const queryParams = new URLSearchParams(window.location.search)
  const loginId = queryParams.get("login_id")
  const loginState = queryParams.get("login_state")

  const [session, setSession] = useState([]);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState('');
  const [completeLoading, setCompleteLoading] = useState(true);
  const [completeError, setCompleteError] = useState('');
  const [organizationId, setOrganizationId] = useState("")

  useEffect(() => {
    console.log("Call getSessionAndUser");
    getSessionAndUser( loginId, loginState, setSession, setSessionLoading, setSessionError );
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
     <ErrorSession loading={sessionLoading} error={sessionError} />
     <Loading loading={sessionLoading} />
     <SelectOrganization loading={sessionLoading} error={sessionError} session={session} organizationId={organizationId} onChange={setOrganizationId} submit={handleSubmit}/>
    </>
  );
}



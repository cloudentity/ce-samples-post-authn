import React, { useState, useEffect } from 'react'

import getSessionAndUser from "./bff/getSessionAndUser"
import completeAuthentication from "./bff/completeAuthentication"

import PageHeader from "./components/PageHeader"
import OrganizationSelection from "./components/OrganizationSelection"
import SystemError from "./components/SystemError"
import UserError from "./components/UserError"
import LoadingMessage from "./components/LoadingMessage"

let completeSemaphore = 0

export default  function App() {

  const queryParams = new URLSearchParams(window.location.search)
  const loginId = queryParams.get("login_id")
  const loginState = queryParams.get("login_state")

  const [session, setSession] = useState([]);
  const [systemLoading, setSystemLoading] = useState(true);
  const [organizationId, setOrganizationId] = useState("");
  const [userErrorObj, setUserErrorObj] = useState({});
  const [systemErrorObj, setSystemErrorObj] = useState({});

  function setUserError(code, error, action) {
    const errorObj = {code: code, error: error, action: action};
    setUserErrorObj(errorObj)
  }

  function setSystemError(code, error) {
    const errorObj = {code: code, error: error};
    setSystemErrorObj(errorObj);
  }

  useEffect(() => {
    getSessionAndUser( loginId, loginState, setSession, setSystemLoading, setUserError, setSystemError  );
  }, [loginId, loginState]);


  const handleSubmit = () => {
    const organizationIdSet = ( organizationId === "" ) ? session.organizations.filter((v,i) => i === 0)[0].orgId : organizationId
    completeAuthentication( organizationIdSet, session.userId, loginId, loginState, setSystemLoading, setSystemError )
  }

  if( !systemLoading && session && session.organizations && session.organizations.length === 1 && (++completeSemaphore === 1)) {
    handleSubmit()
  }

  return (
    <>
     <PageHeader />
     <SystemError errorObj={systemErrorObj}>
       <UserError errorObj={userErrorObj} loginId={loginId} loginState={loginState} setSystemError={setSystemError}>
         <LoadingMessage systemLoading={systemLoading}>
           <OrganizationSelection
             loading={systemLoading}
             session={session}
             organizationId={organizationId}
             onChange={setOrganizationId}
             submit={handleSubmit}
           />
         </LoadingMessage>
       </UserError>
     </SystemError>
    </>
  );
}



import React from "react"

export default function ErrorSession(props) {

  console.log("ErrorSession props.loading:",props.loading);
  console.log("ErrorSession props.error:",props.error);

  return(
      <>
        {!props.loading && props?.error != '' &&
          <>
          <div className="card error">
            <h3>You are not in the system</h3>
            <p>Please ask your supervisor to add you.</p>
          </div>
        </>
       }
     </>
   );
}

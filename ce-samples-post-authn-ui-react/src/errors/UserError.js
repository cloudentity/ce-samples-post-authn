import React from "react"

export default function UserError(props) {

  console.log("UserError props.error:",props.error,props.correction);

  return(
      <>
        {!props.loading && props?.error !== '' &&
          <>
          <div className="card message">
            <h3>{props.error}</h3>
            <p>{props.correction}</p>
          </div>
        </>
       }
     </>
   );
}

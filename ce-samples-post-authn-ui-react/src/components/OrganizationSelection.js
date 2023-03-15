import DebugObject from "./DebugObject"

export default function OrganizationSelection(props) {

  return (
   <>
     {props.session.organizations?.length > 1 &&
      <>
      <div className="card">
        <h3 className="header">Just one more step</h3>
        <p className="select-title">Select an organization</p>
        <select id="organization" name="organization" onChange={(event) => props.onChange(event.target.value)}>
        {props.session.organizations.map(o => (<option key={o.orgId} value={o.orgId}>{o.orgName}</option>))}
        </select>
        <br/>
        <button onClick={props.submit} className="button">Submit</button>
      </div>
      <DebugObject name="Session UserId and Organizations" data={props.session}/>
    </>
    }
   </>
  )
}
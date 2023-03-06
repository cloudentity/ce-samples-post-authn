export default function OrganizationSelection(props) {

  return (
    <div>
      <p className="select-title">Select an organization</p>
      <select id="organization" name="organization" onChange={(event) => props.onChange(event.target.value)}>
      {props.session.organizations.map(o => (<option key={o.orgId} value={o.orgId}>{o.orgName}</option>))}
      </select>
    </div >
  )
}

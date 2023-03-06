export default function Debug(props) {

  return (
    <>
      <hr/>
      <p className="debug">Debug {props.name}</p>
      <pre className="debug">{JSON.stringify(props.data, null, 2)}</pre>
    </>
  )
}


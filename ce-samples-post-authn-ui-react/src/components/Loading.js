export default function Loading(props) {

  return (
    <>
      {props.loading && <div className='loading'>Loading...</div>}
    </>
  )
}


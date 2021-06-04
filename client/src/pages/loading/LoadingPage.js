import { Spinner } from "react-bootstrap"

const LoadingPage = () => {
  return (
    <div className='d-flex justify-content-center loadingContainer'>
      <div className='loading'>
        <Spinner animation='grow' variant='danger' className='mr-2' />
        <Spinner animation='grow' variant='danger' className='mr-2' />
        <Spinner animation='grow' variant='danger' className='mr-2' />
        <Spinner animation='grow' variant='danger' className='mr-2' />
        <Spinner animation='grow' variant='danger' className='mr-2' />
      </div>
    </div>
  )
}

export default LoadingPage

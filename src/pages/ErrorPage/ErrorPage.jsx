import { Link } from 'react-router-dom';
import PageNotFoundImg from '../../assets/illustrations/page-not-found.png';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <>
     <div className='error-div'>
      <img 
       src={PageNotFoundImg}
       alt='404 error, page not found'/>

       <Link to='/landing'> Go back home </Link>
     </div>
    </>
  )
}


export default ErrorPage;
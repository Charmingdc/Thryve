import { useNavigate } from 'react-router-dom';
import PageNotFoundImg from '../../assets/illustrations/page-not-found.png';
import './ErrorPage.css';


const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
     <div className='error-div'>
      <img 
       src={PageNotFoundImg}
       alt='404 error, page not found'/>

       <button onClick={() => navigate('/home')}> 
         Go Back Home :)
       </button>
     </div>
    </>
  )
}


export default ErrorPage;
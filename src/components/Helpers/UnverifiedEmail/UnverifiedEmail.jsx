import { useNavigate } from 'react-router-dom';
import EmailAddressImg from '/illustrations/email-rafiki.png';
import './Style.css';


const UnverifiedEmail = () => {
  const navigate = useNavigate();

  return (
    <>
     <div className='error-div'>
      <img 
       src={EmailAddressImg}
       alt='Unverified email address'/>
       
       <h2>
        Email address not verified!
       </h2>
       
       <p>
        Please check your inbox 📥 and verify your email address.
        </p>

       <button onClick={() => navigate('/home')}> 
         I've verified my email
       </button>
     </div>
    </>
  )
}


export default UnverifiedEmail;
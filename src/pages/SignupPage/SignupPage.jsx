import { Link } from 'react-router-dom';
import JournalRafiki from '../../assets/illustrations/journal-rafiki.png';
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import './SignupPage.css';


const SignupPage = () => {
  return (
    <>
     <div className='signup-container'>
      <div className='img-holder'>
        <img 
          src={JournalRafiki}
          alt='Journal illustration'/>
      </div>


      <form>
        <h1> Thryve </h1>

        <div className='signup-nav'>
         <div>
          <Link to='/login'> Login </Link>
         </div>

         <div> Signup </div>
        </div>


        <div className='group'>
         <HiOutlineUser className='signup-icon' />
         <input className='input' type="text" name='username' placeholder='Enter a unique username' />
        </div>

        <div className='group'>
         <HiOutlineMail className='signup-icon' />
         <input className='input' type='email' name='email' placeholder='Enter a valid email' />
        </div>

        <div className='group'>
         <HiOutlineLockClosed className='signup-icon' />
         <input className='input' type='password' name='password' placeholder='Enter a secret password' />
        </div>
        
        <p className='signup-terms-link'>
          By signing up you agree to our <Link to='/terms'> <strong> terms </strong> and <strong> conditions </strong> </Link>
        </p>

        <button className='signup-button'>
         Signup
        </button>

        <div className='alternative'>
         Or Signup with
        </div>

        <div className='google-bar'>
          <h2> Google </h2>
        </div>
        
      </form> 
     </div>
    </>
  )
}

export default SignupPage;
import { Link } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import './SignupPage.css';


const SignupPage = () => {
  return (
    <>
     <div className='signup-container'>
      <form>
        <h1> Thryve </h1>

        <div className='signup-nav'>
         <div>
          <Link to='/login'> Login </Link>
         </div>

         <div> Signup </div>
        </div>


        <div className='group'>
         <FiUser className='signup-icon' />
         <input className='input' type="text" name='username' placeholder='Enter a unique username' />
        </div>

        <div className='group'>
         <FiMail className='signup-icon' />
         <input className='input' type='email' name='email' placeholder='Enter a valid email' />
        </div>

        <div className='group'>
         <FiLock className='signup-icon' />
         <input className='input' type='password' name='password' placeholder='Enter a secret password' />
        </div>


        <button className='signup-button'>
         Signup
        </button>

        <div className='alternative'>
         Or Signup with
        </div>
      </form> 

      <div className='google-bar'>
        <h2> Google </h2>
      </div>
     </div>
    </>
  )
}

export default SignupPage;
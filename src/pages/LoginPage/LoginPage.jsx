import { Link } from 'react-router-dom';
import WelcomeImg from '../../assets/illustrations/welcome-amico.png';
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineLockClosed } from "react-icons/hi2";
import './LoginPage.css';


const LoginPage = () => {
  return (
   <>
    <div className="login-container">
      <div className='img-holder'>
        <img 
          src={WelcomeImg}
          alt='Welcome img illustration'/>
      </div>


      <form>
        <h1> Welcom back </h1>

        <div className="login-nav">
          <div> Login </div>

          <div>
           <Link to='/signup'> Signup </Link>
          </div>
        </div>

        <div className="group">
          <HiOutlineUser className='login-icon' />
          <input className="input" type="text" name="username" placeholder="Enter your username" />
        </div>

        <div className="group">
          <HiOutlineLockClosed className='login-icon' />
          <input className="input" type="password" name="password" placeholder="Enter your password" />
        </div>

        <Link to='/reset-password' id="forgot-password">
          Forgot password ?
        </Link>

        <button className='login-button'>
          Login
        </button>

        <div className="alternative">
          Or Login with
        </div>

        <div className='google-bar'>
          <h2> Google </h2>
        </div>
      </form>
    </div>
   </>
  )
}

export default LoginPage;

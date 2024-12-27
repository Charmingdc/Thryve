import { Link } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import './LoginPage.css';


const LoginPage = () => {
  return (
   <>
    <div className="login-container">
      <form>
        <h1> Welcom back </h1>

        <div className="login-nav">
          <div> Login </div>

          <div>
           <Link to='/signup'> Signup </Link>
          </div>
        </div>

        <div className="group">
          <FiUser className='login-icon' />
          <input className="input" type="text" name="username" placeholder="Enter your username" />
        </div>

        <div className="group">
          <FiLock className='login-icon' />
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
      </form>

      <div className="google-bar">
        <h2> Google </h2>
      </div>
    </div>
   </>
  )
}

export default LoginPage;

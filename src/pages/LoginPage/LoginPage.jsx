import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import WelcomeImg from '../../assets/illustrations/welcome-amico.png';
import { auth, db } from '../../firebase/firebase-init';
import { validateLogInInput } from '../../functions/validateInput';
import './LoginPage.css';


const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const getEmailFromUserName = async (username) => {
    try {
      const docRef = doc(db, 'users', username.toLowerCase());
      const userSnap = await getDoc(docRef);
      if (userSnap.exists()) {
        return userSnap.data().email;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const error = validateLogInInput(userName, password);
      if (error) throw new Error(error);
      const email = await getEmailFromUserName(userName);
      if (!email) throw new Error("Incorrect username");
      await signInWithEmailAndPassword(auth, email, password);
      setUserName('');
      setPassword('');
      toast.success("Welcome back");
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  }
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
          <input onChange={(e) => setUserName(e.target.value)} value={userName} className="input" type="text" name="username" placeholder="Enter your username" />
        </div>

        <div className="group">
          <HiOutlineLockClosed className='login-icon' />
          <input onChange={(e) => setPassword(e.target.value)} value={password} className="input" type="password" name="password" placeholder="Enter your password" />
        </div>

        <Link to='/reset-password' id="forgot-password">
          Forgot password ?
        </Link>

        <button onClick={handleLogIn} className='login-button'>
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

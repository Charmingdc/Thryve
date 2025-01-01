import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import WelcomeImg from '../../assets/illustrations/welcome-amico.png';
import Loader from '../../components/Helpers/Loader';

import { auth, db } from '../../firebase/firebase-init';
import { formatError } from '../../functions/formatFirebaseError';
import { validateLogInInput } from '../../functions/validateInput';
import './LoginPage.css';


const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const getEmailFromUserName = async (username) => {
    try {
      // reference the users collection
      const docRef = doc(db, 'users', username.toLowerCase());
      const userSnap = await getDoc(docRef);

      // check if hsern exist
      // then get user email else return
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
      // get response from validate inputs functions
      const error = validateLogInInput(userName, password);
      if (error) throw new Error(error);

      // set Loading state to true
      setLoading(true);

      // get user email
      const email = await getEmailFromUserName(userName);

      // display an error is username is not in the database
      if (!email) throw new Error("Incorrect username");

      // sign user in
      await signInWithEmailAndPassword(auth, email, password);

      // reset all inputs
      setUserName('');
      setPassword('');

      // show success toast
      toast.success("Welcome back");
    } catch (e) {
      console.log(e.message);

      if (e.message.startsWith('Firebase')) {
        const errorMessage = await formatError(e.message);
        toast.error(errorMessage);
        return;
      }

      toast.error(e.message);
    } finally {
      // reset loading state
      setLoading(false);
    }
  }

const handleGoogleLogin = async (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();

  try {
    toast.info("Wait while we sign you in");

    // Authenticate with Google and retrieve user info
    const userInfo = await signInWithPopup(auth, provider);
    const user = userInfo.user;

    if (!user) {
      toast.error("An error occurred during authentication");
      return;
    }

    // Check if user exists in Firestore
    const userEmail = user.email;
    const docRef = doc(db, 'users', userEmail.toLowerCase());
    const userSnap = await getDoc(docRef);

    if (!userSnap.exists()) {
      // If user does not exist, sign out and throw error
      await auth.signOut();
      throw new Error("No account found with this Google account. Please sign up first.");
    }

    // User exists, proceed with login
    toast.success("Welcome back!");
  } catch (e) {
    console.error(e.message);

    if (e.message.startsWith('Firebase')) {
      const errorMessage = await formatError(e.message);
      toast.error(errorMessage);
      return;
    }

    toast.error(e.message);
  }
};


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
          {loading ? <Loader /> : 'LogIn'}
        </button>

        <div className="alternative">
          Or Login with
        </div>

        <button className='google-bar' onClick={handleGoogleLogin}>
          <h2> Google </h2>
        </button>
      </form>
    </div>
   </>
  )
}

export default LoginPage;

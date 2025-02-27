import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import JournalRafiki from '../../assets/illustrations/journal-rafiki.png';
import Loader from '../../components/Helpers/Loader';

import { auth, db } from '../../firebase/firebase-init';
import { formatError } from '../../functions/formatFirebaseError';
import { validateSignupInput } from '../../functions/validateInput';
import './SignupPage.css';



const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');


  const handleSignup = async (e) => {
    e.preventDefault();
    // await validate input response
    const error = validateSignupInput(userName, password, email);

    try {
      // throw an error if there's an error when validating input
      if (error) throw new Error(error);

      // set loading state to true
      setLoading(true);

      // check database if username already exist
      const docRef = doc(db, 'users', userName.toLocaleLowerCase());
      const userSnap = await getDoc(docRef);

      // throw an error if it is
      if(userSnap.exists()) throw new Error("Username have already been taken");

      // get user information
      const userInfo = await createUserWithEmailAndPassword(auth, email, password);

      // update userId state
      const user = userInfo.user;
      setUserId(userInfo.user.uid);

      // create user object
      const userData = {
        userName: userName.toLowerCase(),
        email: email,
        userId: userId,
      }

      // save user info to database
      await setDoc(doc(db, 'users', userName.toLowerCase()), userData);

      // update user display name
      await updateProfile(user, { displayName: userName });

      // send email verification to user
      sendEmailVerification(user);

      // reset all inputs
      setUserName('');
      setPassword('');
      setEmail('');

      // show success toast
      toast.success("Signed up successfully");
    } catch (e) {
      console.log(e.message);

      // display error toast
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

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      toast.info("Please wait while we sign you up");
      const user = result.user;
      const userName = user.email.split('@')[0].toLowerCase();
      await updateProfile(user, { displayName: userName });

      // check if user already exist in database
      const docRef = doc(db, 'users', userName.toLowerCase());
      const userSnap = await getDoc(docRef);

      // throw an error if it is
      if (userSnap.exists()) {
        toast.warning("You already have an account, please login");
        return navigate('/login');
      }

      // create user object
      const userData = {
        userName: userName,
        email: user.email,
        userId: user.uid,
      }

      // save user info to database
      await setDoc(doc(db, 'users', userName), userData);

      // show success toast
      toast.success("Signed up successfully");
    } catch (e) {
      console.log(e.message);
      console.log(e);

      // display error toast
      if (e.message.startsWith('Firebase')) {
        const errorMessage = await formatError(e.message);
        toast.error(errorMessage);
        return;
      }

      toast.error(e.message);
    }
  }

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
         <input onChange={(e) => setUserName(e.target.value)} value={userName} className='input' type="text" name='username' placeholder='Enter a unique username' />
        </div>

        <div className='group'>
         <HiOutlineMail className='signup-icon' />
         <input onChange={(e) => setEmail(e.target.value)} value={email} className='input' type='email' name='email' placeholder='Enter a valid email' />
        </div>

        <div className='group'>
         <HiOutlineLockClosed className='signup-icon' />
         <input onChange={(e) => setPassword(e.target.value)} value={password} className='input' type='password' name='password' placeholder='Enter a secret password' />
        </div>

        <p className='signup-terms-link'>
          By signing up you agree to our <Link to='/terms'> <strong> terms </strong> and <strong> conditions </strong> </Link>
        </p>

        <button onClick={handleSignup} className='signup-button'>
          {loading ? <Loader /> : 'Signup'}
        </button>

        <div className='alternative'>
         Or Signup with
        </div>

        <button onClick={handleGoogleSignup} className='google-bar'>
          <h2> Google </h2>
        </button>

      </form>
     </div>
    </>
  )
}

export default SignupPage;

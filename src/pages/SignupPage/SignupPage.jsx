import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import JournalRafiki from '../../assets/illustrations/journal-rafiki.png';
import { auth, db } from '../../firebase/firebase-init';
import { validateSignupInput } from '../../functions/validateInput';
import './SignupPage.css';


const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const handleSignup = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'users', userName);
    const userSnap = await getDoc(docRef);
    const error = validateSignupInput(email, password, userName);
    try {
      if (error) throw new Error(error);
      if(userSnap) throw new Error("Username have already been taken")
      const userInfo = await createUserWithEmailAndPassword(auth, email, password);
      const user = userInfo.user;
      setUserId(userInfo.user.uid);
      const userData = {
        userName: userName.toLowerCase(),
        email: email,
        userId: userId,
      }
      await setDoc(doc(db, 'users', userName.toLowerCase()), userData);
      await updateProfile(user, { displayName: userName });
      setUserName('');
      setPassword('');
      setEmail('');
      toast.success("Signed up successfully");
    } catch (e) {
      console.log(e.message);
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

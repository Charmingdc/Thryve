import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase-init';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { HiOutlineMail } from "react-icons/hi";
import ForgotPasswordImg from '../../assets/illustrations/forgot-password.png';
import Loader from '../../components/Helpers/Loader';

import './Style.css';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  
  
  const validateEmail = async (email) => {
    if (email === '') return 'No email entered';

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return 'Invalid email format';

    return;
  }

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await validateEmail(email);
      if (response) {
        toast.error(`${response}`);
        return;
      }

      // send reset password email
      await sendPasswordResetEmail(auth, email);

      //reset email input
      setEmail('');

      // display success toast
      toast.success('If this email exists in our system, a password reset email has been sent. Please check your inbox');
    } catch (err) {
       console.error(err.message);

       toast.error(err.message)
    } finally {
      // reset loading state
      setLoading(false);
    }
  }

  return (
    <>
     <section className='reset-password-container'>
      <div className='reset-psw-img-holder'>
        <img
          src={ForgotPasswordImg}
          alt='Forgot-password.png'/>
      </div>


      <form className='reset-password-form'>
        <h1> Forgot Password? </h1>
        <p> 
          Don't worry, it happens. Please enter the email address associated with your account. 
        </p>


        <div className='group'>
          <HiOutlineMail className='reset-psw-icon' />
          <input 
            className='input'
            type='email'
            placeholder='Enter your email'
            value={email} 
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <Link to='/login'> Wait, I remember my password </Link>

        <button className='reset-password-button' onClick={handleReset}>
          {loading ? <Loader /> : 'Submit'} 
        </button>
      </form>
     </section>
    </>
  )
}

export default ResetPassword
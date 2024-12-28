import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import ForgotPasswordImg from '../../assets/illustrations/forgot-password.png';
import './Style.css';

const ResetPassword = () => {
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
          <FiMail className='reset-psw-icon' />
          <input className='input' type='email' name='email' placeholder='Enter your email'/>
        </div>

        <Link to='/login'> Wait, I remember my password </Link>

        <button className='reset-password-button'>
          Submit 
        </button>
      </form>
     </section>
    </>
  )
}

export default ResetPassword
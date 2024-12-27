import './LoginPage.css'


const LoginPage = () => {
  return (
   <>
    <div className="login-container">
      <form>
        <h1> Thryve </h1>

        <div className="nav"> 
          <div> Login </div>
          <div> Signup </div>
        </div>

        <div className="group">
          <input className="input" type="text" name="username" placeholder="Enter your username" /> 
        </div>

        <div className="group">
          <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
                     <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
                             </svg>
          <input className="input" type="password" name="password" placeholder="Enter your password" />
        </div>

        <a id="forgot-password">
          Ohh, I forgot my password 🔐
        </a>

        <button>
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
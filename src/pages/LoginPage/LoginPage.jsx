import './LoginPage.css'


const LoginPage = () => {
  return (
   <>
    <div className="container">
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
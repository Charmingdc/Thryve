import "./Header.css";

const Header = () => {
  return (
    <header className="header">
        <div className="logo-container">
              <h1 className="logo">Thrive</h1>
        </div>
        <div className="auth-buttons">
            <button className="signin-btn">SignIn</button>
            <button className="register-btn">Register</button>
        </div>
    </header>
  );
}

export default Header;

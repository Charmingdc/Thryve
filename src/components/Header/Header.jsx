import "./Header.css";

const Header = () => {
  return (
    <header className="header">
        <div className="logo-container">
              <h1 className="logo">Thrive</h1>
        </div>
        <nav className="nav">
            <ul className="nav-links">
                <li className="link"><a href="#">Product</a></li>
                <li className="link"><a href="#">Template</a></li>
                <li className="link"><a href="#">Blog</a></li>
                <li className="link"><a href="#">Pricing</a></li>
            </ul>
        </nav>
        <div className="auth-buttons">
            <button className="signin-btn">SignIn</button>
            <button className="register-btn">Register</button>
        </div>
    </header>
  );
}

export default Header;

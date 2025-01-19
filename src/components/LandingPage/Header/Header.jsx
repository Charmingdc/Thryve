import { Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
        <div className="logo-container">
            <h1 className="logo">Thryve</h1>
        </div>
        <div className="auth-buttons">
            <button className="signin-btn">
              <Link to='/login'> SignIn </Link>
            </button>

            <button className="register-btn">
              <Link to='/login'> Login </Link>
            </button>
        </div>
    </header>
  );
}

export default Header;

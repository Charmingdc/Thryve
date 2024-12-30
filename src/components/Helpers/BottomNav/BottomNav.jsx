import { Link } from 'react-router-dom';
import { HiCalendar, HiHome, HiUser } from "react-icons/hi2";
import "./BottomNav.css";

const BottomNav = ({currentPage}) => {
  return (
    <nav className="bottom-navbar">
      <Link to='/home'> 
        <HiHome size={28} color={currentPage === "home" ? "rgb(138, 46, 226)" : "rgb(181, 127, 239)"} cursor={"pointer"}/>
      </Link>

      <Link to='/calendar'>
        <HiCalendar size={28} color={currentPage === "calendar" ? "rgb(138, 46, 226)" : "rgb(181, 127, 239)"} cursor={"pointer"} />
      </Link>

      <Link to='/setting'>
        <HiUser size={28} color={currentPage === "setting" ? "rgb(138, 46, 226)" : "rgb(181, 127, 239)"} cursor={"pointer"} />
      </Link>
    </nav>
  );
}
export default BottomNav;

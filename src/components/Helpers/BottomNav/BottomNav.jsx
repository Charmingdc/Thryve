import { HiCalendar, HiCog, HiHome, HiUser } from "react-icons/hi2";
import "./BottomNav.css";
const BottomNav = ({currentPage}) => {
  return (
    <nav className="navbar">
      <HiHome size={25} color={currentPage === "home" ? "rgb(138, 46, 226)" : "rgb(181, 127, 239)"} cursor={"pointer"}/>
      <HiCalendar size={25} color={currentPage === "calender" ? "rgb(138, 46, 226)" : "rgb(181, 127, 239)"} cursor={"pointer"} />
      <HiCog size={25} color={currentPage === "setting" ? "rgb(138, 46, 226)" : "rgb(181, 127, 239)"} cursor={"pointer"} />
      <HiUser size={25} color={currentPage === "profile" ? "rgb(138, 46, 226)" : "rgb(181, 127, 239)"} cursor={"pointer"} />
    </nav>
  );
}
export default BottomNav;

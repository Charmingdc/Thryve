import { HiCalendar, HiHome, HiUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";


const SideBar = ({currentPage}) => {
  const navigate = useNavigate();


  return (
    <div className="sidebar">
      <h2>Thryve</h2>

      <div className="sidebar-links">
        <div onClick={() => navigate('/home')} className="sidebar-link" style={{backgroundColor: currentPage === "home" ? "var(--primary-color)" : ""}}>
            <HiHome size={25} />
            <p>Home</p>
        </div>

        <div onClick={() => navigate('/calendar')} className="sidebar-link" style={{backgroundColor: currentPage === "calendar" ? "var(--primary-color)" : ""}}>
            <HiCalendar size={25} />
            <p>Calendar</p>
        </div>

        <div onClick={() => navigate('/setting')} className="sidebar-link" style={{backgroundColor: currentPage === "setting" ? "var(--primary-color)" : ""}}>
            <HiUser size={25} />
            <p>Settings</p>
        </div>
      </div>
      
    </div>
  );
}
export default SideBar;

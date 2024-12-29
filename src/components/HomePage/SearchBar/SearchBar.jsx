import { HiCalendar, HiUser } from "react-icons/hi2";
import "./SearchBar.css";

const SearchBar = () => {
    return (
        <div className="search-bar">
            <HiCalendar size={30} style={{color: "var(--primary-color)"}} />
            <input type="text" placeholder="Search Journey" />
            <button><HiUser size={30} style={{color: "var(--primary-color)" }} /></button>
        </div>
    )
}

export default SearchBar;

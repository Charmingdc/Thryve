import { HiCalendar } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import "./SearchBar.css";

const SearchBar = () => {
    return (
        <div className="search-bar">
          <HiCalendar size={30} style={{color: "var(--primary-color)"}} />
          <div className=""></div> <input type="text" placeholder="Search Journey..." />
          <button>
            <IoSearch size={30} style={{color: "var(--primary-color)" }} />
          </button>
        </div>
    )
}

export default SearchBar;

import { HiCalendar } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import "./SearchBar.css";
import { useEffect, useState } from "react";

const SearchBar = ({datas, onJournalSearch}) => {
  const [input, setInput] = useState('');
  
  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setInput(searchTerm);

    if (searchTerm === '') {
      onJournalSearch(null);
    } else {
      const filteredData = datas.filter(journal => journal.journalTitle.toLowerCase().includes(searchTerm));
      onJournalSearch(filteredData);
    }
  }
  

  return (
    <div className="search-bar">
      <HiCalendar size={30} style={{color: "var(--primary-color)"}} />
      <div className=""></div> 
      <input 
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search Journal by title..." />
      <button onClick={handleInputChange}>
        <IoSearch size={30} style={{color: "var(--primary-color)" }} />
      </button>
    </div>
  )
}

export default SearchBar;

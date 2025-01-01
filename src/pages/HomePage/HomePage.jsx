import SideBar from "../../components/Helpers/SideBar";
import BottomNav from "../../components/Helpers/BottomNav";
import ActionButton from '../../components/Helpers/ActionButton';
import JournalsContainer from "../../components/HomePage/Journals/JournalsContainer";
import SearchBar from "../../components/HomePage/SearchBar/SearchBar";
import "./HomePage.css";

const HomePage = () => {
  return (
   <>
    <div className="home-page-container">
      <SideBar currentPage="home" />
      
      <div className="home-page">
        <SearchBar />
        <JournalsContainer />
      </div>
    </div>
    
    <ActionButton />
    <BottomNav currentPage="home" />
   </>
  );
};

export default HomePage;

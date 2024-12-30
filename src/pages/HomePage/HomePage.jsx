import SideBar from "../../components/Helpers/SideBar/SideBar";
import JournalsContainer from "../../components/HomePage/Journals/JournalsContainer";
import SearchBar from "../../components/HomePage/SearchBar/SearchBar";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <SideBar currentPage="home" />
      <div className="home-page">
        <SearchBar />
        <JournalsContainer />
      </div>
    </div>
  );
};

export default HomePage;

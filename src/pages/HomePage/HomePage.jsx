import JournalsContainer from "../../components/HomePage/Journals/JournalsContainer";
import SearchBar from "../../components/HomePage/SearchBar/SearchBar";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <SearchBar />
      <JournalsContainer />
    </div>
  );
}
export default HomePage;

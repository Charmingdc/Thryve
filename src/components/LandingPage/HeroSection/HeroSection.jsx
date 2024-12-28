import { Link } from 'react-router-dom';
import "./HeroSection.css";


const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="description">
                <h1>The Ultimate digital <b style={{color: "#8a2be2"}}>Journal</b></h1>
                <p>
                 Express, reflect, and immortalize the moments of your daily life with the world’s most cherished digital journal.          . 
                </p>
                <Link to='/signup'> Get Started </Link>
            </div>
            <div className="hero-image">
                <img src="src/assets/LandingPageAssets/header-image.png" alt="Hero Image" />
            </div>
        </section>
    )
}

export default HeroSection;

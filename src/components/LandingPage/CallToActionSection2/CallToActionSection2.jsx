import { Link } from 'react-router-dom';
import "./CallToActionSection2.css";


const CallToActionSection2 = () => {
    return(
        <section className="cta">
            <div className="container">
                <div className="cta-content">
                    <img src="src/assets/LandingPageAssets/free-for-everyone.png" />
                </div>
                <div className="cta-content">
                    <h2>Thrive is free for everyone</h2>
                    <Link to='/signup'> Try thrive now </Link>
                </div>
                <div className="cta-content to-be-removed">
                    <img src="src/assets/LandingPageAssets/free-for-everyone-two.png" />
                </div>
            </div>
        </section>
    )
}

export default CallToActionSection2;

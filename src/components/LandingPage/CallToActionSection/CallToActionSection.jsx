import { Link } from 'react-router-dom';

import "./CallToActionSection.css";
const CallToActionSection = () => {
    return (
        <section className="call-to-action-section">
            <div className="container">
                <div className="image">
                    <img src="/LandingPageAssets/sync-data.png" alt="" />
                </div>
                <div className="description">
                    <p><b>New</b></p>
                    <h2>Sync with your other devices</h2>
                    <p>Whether you're in the office, in the classroom,
                        or at the grocery store, the latest version of your digital notes are only one tap away</p>
                    <Link to='/signup' className="call-to-action-btn">Learn more</Link>
                </div>
            </div>
        </section>
    )
}

export default CallToActionSection;

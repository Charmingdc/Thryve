import "./CallToActionSection.css";
const CallToActionSection = () => {
    return (
        <section className="call-to-action-section">
            <div className="container">
                <div className="image">
                    <img src="src/assets/LandingPageAssets/sync-data.png" alt="" />
                </div>
                <div className="description">
                    <p><b>New</b></p>
                    <h2>Sync with your other devices</h2>
                    <p>Weather you're in the office, in the classroom,
                        or at the grocery store, the latest version of your digital notes are only one tap away</p>
                    <button className="call-to-action-btn">Learn more</button>
                </div>
            </div>
        </section>
    )
}

export default CallToActionSection;

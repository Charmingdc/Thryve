import "./FeaturesSection.css";

const FeaturesSection = () => {
    return (
        <section className="features-section">
            <h1>An app where you'll find a peace of mind</h1>
            <div className="container">
                <div className="feature">
                    <div className="image">
                        <img src="src/assets/LandingPageAssets/tangled-idea.png" className="" />
                    </div>
                    <h2>Clear your tangled mind</h2>
                    <p>Organize your thoughts and bring clarity to your mind.</p>
                </div>
                <div className="feature">
                    <div className="image">
                        <img src="src/assets/LandingPageAssets/thoughts.png" className="" />
                    </div>
                    <h2>Write down your thoughts</h2>
                    <p>Note down, shape & and share your ideas with the world's best loved digital paper</p>
                </div>
                <div className="feature">
                    <div className="image">
                        <img src="src/assets/LandingPageAssets/your-choice.png" className="" />
                    </div>
                    <h2>The choice is yours</h2>
                    <p>Reflect the way you want with variety of tools</p>
                </div>
            </div>
        </section>
    )
}
export default FeaturesSection;

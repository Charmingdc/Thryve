import "./HeroSection.css";
const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="description">
                <h1>The Ultimate digital Journal</h1>
                <p>Write, draw and Immortalize the things during your day to day life with worlds
                    the world's best loved digital journal.
                </p>
                <button>Get Yours now</button>
            </div>
            <div className="hero-image">
                <img src="./images/hero-image.png" alt="Hero Image" />
            </div>
        </section>
    )
}

export default HeroSection;

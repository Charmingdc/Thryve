import CallToActionSection from "../../components/CallToActionSection/CallToActionSection";
import CallToActionSection2 from "../../components/CallToActionSection2/CallToActionSection2";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import Header from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import TestimonialsSection from "../../components/TestimonialsSection/TestimonialsSection";
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Header />
            <HeroSection />
            <FeaturesSection />
            <CallToActionSection />
            <TestimonialsSection />
            <CallToActionSection2 />
        </div>
    );
}

export default LandingPage;

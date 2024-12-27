import CallToActionSection from "../../components/LandingPage/CallToActionSection/CallToActionSection";
import CallToActionSection2 from "../../components/LandingPage/CallToActionSection2/CallToActionSection2";
import FeaturesSection from "../../components/LandingPage/FeaturesSection/FeaturesSection";
import Footer from "../../components/LandingPage/Footer/Footer";
import Header from "../../components/LandingPage/Header/Header";
import HeroSection from "../../components/LandingPage/HeroSection/HeroSection";
import TestimonialsSection from "../../components/LandingPage/TestimonialsSection/TestimonialsSection";
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
            <Footer />
        </div>
    );
}

export default LandingPage;

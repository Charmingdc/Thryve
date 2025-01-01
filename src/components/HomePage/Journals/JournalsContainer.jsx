import GratituteQoute from "./GratitudeQoute";
import Journal from "./Journal";
import "./Journal.css";

const JournalsContainer = () => {
    return (
        <div className="journals-container">
            <GratituteQoute />
            <div className="journals">
                <Journal />
                <Journal />
                <Journal />
                <Journal />
            </div>
        </div>
    );
}
export default JournalsContainer;

import GratituteQoute from "./GratitudeQuote";
import Journal from "./Journal";
import "./Journal.css";

const JournalsContainer = ({gratitudeQuote}) => {
    return (
        <div className="journals-container">
            <GratituteQoute quote={gratitudeQuote} />
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

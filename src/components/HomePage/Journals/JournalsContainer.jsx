import { useEffect } from "react";
import GratituteQoute from "./GratitudeQuote";
import Journal from "./Journal";
import "./Journal.css";

const JournalsContainer = ({gratitudeQuote, journals }) => {
 return (
    <div className="journals-container">
      <GratituteQoute quote={gratitudeQuote} />

      <div className="journals">
        {journals.length > 0 ? (
          journals.map((journal, index) => (
            <Journal journal={journal} key={index} />
          ))
        ) : (
         <h1> No journals </h1>    
        )}     
      </div>
    </div>
 );
}
export default JournalsContainer;

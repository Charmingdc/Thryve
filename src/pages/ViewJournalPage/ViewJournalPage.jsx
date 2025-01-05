import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from '../../firebase/firebase-init';
import { doc, getDoc } from "firebase/firestore";
import getDateDetails from '../../functions/getDateDetails';
import journalTime from '../../functions/journalTime';
import { FaChevronLeft } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { HiFaceSmile } from "react-icons/hi2";

import SideBar from "../../components/Helpers/SideBar";
import "./ViewJournalPage.css";
import { toast } from "sonner";



const ViewJournalPage = () => {
    const [journalDetails, setJournalDetails] = useState({});
    const [fullDate, setFullDate] = useState('');
    const [time, setTime] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);
    const params = useParams();
  
    const getJournal = async () => {
      try {
        setLoading(true);
        const journalRef = doc(db, 'journals', params.journalId);

        const docSnap = await getDoc(journalRef);
        const docData = docSnap.data();

        const date = new Date(docData.createdAt.toDate());
        const formatedTime = journalTime(date);
        const dateDetails = getDateDetails(date);

        setFullDate(`${dateDetails.monthName} ${dateDetails.day}, ${dateDetails.year}`);
        setTime(formatedTime);
        setJournalDetails(docData);
      } catch (err) {
        console.error(err.message);
      }
    };
    

    useEffect(() => {
      if (hasFetched.current) return;

      getJournal();
      hasFetched.current = true;
    }, []);

    return (
        <div className="view-journal-page">
            <SideBar currentPage='home' />

            <div className="view-journal-container">
                <nav className="nav-something">
                    <div className='topnav-icon-holder'>
                      <FaChevronLeft className='icon' onClick={() => navigate(-1)} />
                    </div>
                    <h1> Journal Detail </h1>
                    <HiDotsVertical className="ellipsis-icon" size={24} onClick={() => setShowOptions(prevState => !prevState)} />

                    {showOptions && (
                        <div className="options-menu">
                            <button className="option-button" style={{color: "var(--text-color)"}}>Edit</button>
                            <button className="option-button" style={{color: "var(--text-color)"}}>Delete Journal</button>
                        </div>
                    )}
              </nav>

                <div className="container">
                  <div className="view-journal-header">
                    <div className="mood-icon-holder">
                        <HiFaceSmile className='mood-icon' size={50} />
                    </div>

                    <p className="feeling"> {journalDetails.journalMood} </p>

                    <div className="time">
                        <span> { fullDate }</span>
                        <span>-</span>
                        <span> {time} </span>
                    </div>

                    <h3 className="title">
                      { journalDetails.journalTitle }
                    </h3>
                  </div>

                  <div className="view-journal-body">
                    <p className="entries">
                      { journalDetails.journalContent }
                    </p>
                  </div>
               </div>
            </div> 
        </div>
    )
}

export default ViewJournalPage;
  
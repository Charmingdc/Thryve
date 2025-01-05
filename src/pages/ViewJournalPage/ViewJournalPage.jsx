import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../../firebase/firebase-init';
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

import getDateDetails from '../../functions/getDateDetails';
import journalTime from '../../functions/journalTime';
import getMoodPicture from '../../functions/getMoodPicture';

import { FaChevronLeft } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

import Loader from '../../components/Helpers/Loader';
import SideBar from "../../components/Helpers/SideBar";
import "./ViewJournalPage.css";


const ViewJournalPage = () => {
    const [journalDetails, setJournalDetails] = useState({});
    const [fullDate, setFullDate] = useState('');
    const [moodIcon, setMoodIcon] = useState('');
    const [time, setTime] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);
    const params = useParams();
    const navigate = useNavigate();


    const handleJournalDelete = async () => {
      const toastId = toast.loading('Deleting your journal...');

      try {
        // get a reference to current journal
        const journalRef = doc(db, 'journals', params.journalId);

        // call the delete function 
        await deleteDoc(journalRef);

        // show success toast
        toast.success('Journal deleted successfully');

        // redirect back home
        navigate('/home');
      } catch (err) {
        console.error(err.message);
      } finally {
        toast.dismiss(toastId);
      }
    };


    const getJournal = async () => {
      setLoading(true);

      try {  
        // get a reference to the journal selected
        const journalRef = doc(db, 'journals', params.journalId);

        // get journal data
        const docSnap = await getDoc(journalRef);
        const docData = docSnap.data();

        // transform journal mood to journal icons
        const moodIconUrl = getMoodPicture(docData.journalMood);

        // get and format date and time 
        const date = new Date(docData.createdAt.toDate());
        const formatedTime = journalTime(date);
        const dateDetails = getDateDetails(date);

        // set all necessary states
        setMoodIcon(moodIconUrl);
        setFullDate(`${dateDetails.monthName} ${dateDetails.day}, ${dateDetails.year}`);
        setTime(formatedTime);
        setJournalDetails(docData);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
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
                    <div className='topnav-icon-holder' onClick={() => navigate(-1)}>
                      <FaChevronLeft className='icon' />
                    </div>
                    <h1> Journal Detail </h1>
                    <HiDotsVertical className="ellipsis-icon" size={24} onClick={() => setShowOptions(prevState => !prevState)} />

                    {showOptions && (
                        <div className="options-menu">
                            <button className="option-button" style={{color: "var(--text-color)"}}>Edit</button>
                            <button className="option-button" style={{color: "var(--text-color)"}} onClick={handleJournalDelete}> Delete Journal </button>
                        </div>
                    )}
              </nav>

              { loading ? (
                <div style={{height: '80%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}> <Loader /> <p> Loading.. </p> </div>
              ) : ( 
               <div className="container">
                  <div className="view-journal-header">
                    <div className="mood-icon-holder">
                      <img src={moodIcon} alt={moodIcon} className="mood-icon" />
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
              )}  
            </div> 
        </div>
    )
}

export default ViewJournalPage;
  
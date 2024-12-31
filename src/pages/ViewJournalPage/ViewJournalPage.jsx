import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { HiArrowLeftCircle, HiFaceSmile } from "react-icons/hi2";
import Sidebar from "../../components/Helpers/Sidebar/Sidebar";
import "./ViewJournalPage.css";

const ViewJournalPage = () => {
    const [showOptions, setShowOptions] = useState(false);

    return(
        <div className="view-journal-page">
            <Sidebar />
            <div className="view-journal-container">
                <nav className="nav-something">
                    <HiArrowLeftCircle className='topnav-icon' onClick={() => navigate(-1)} />
                    <h1> Journal Detail </h1>
                    <HiDotsVertical className="topnav-icon" size={24} onClick={() => setShowOptions(prevState => !prevState)} />
                    {showOptions && (
                        <div className="options-menu">
                            <button className="option-button" style={{color: "var(--text-color)"}}>Edit</button>
                            <button className="option-button" style={{color: "var(--text-color)"}}>Delete Journal</button>
                        </div>
                    )}
                </nav>
                <div className="container">
                <div className="view-journal-header">
                    <div className="view-journal-icon">
                        <HiFaceSmile size={30} />
                    </div>
                    <p className="feeling">Enjoyment</p>
                    <div className="time">
                        <span>Sun 24, 2024</span>
                        <span>-</span>
                        <span>12:00 AM</span>
                    </div>
                    <h3 className="title">
                        Feeling happy today.
                    </h3>
                </div>
                <div className="view-journal-body">
                    <p className="entries">
                        I woke up feeling happy today. I had a good night sleep and I am excited to start the day. I am looking forward to the things that I will do today. I am grateful for the good things that are happening in my life. I am happy and contented.
                    </p>
                    <div className="feeling-illustration">
                        <HiFaceSmile size={500} />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ViewJournalPage;

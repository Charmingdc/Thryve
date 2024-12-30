import { useNavigate } from "react-router-dom";
import { HiArrowLeftCircle } from "react-icons/hi2";
import './Style.css';


const Topnavbar = ({currentPageName}) => {
  const navigate = useNavigate();

  return (
    <>
     <div className='topnav'>
       <HiArrowLeftCircle className='topnav-icon' onClick={() => navigate(-1)} />
           
       <h1> {currentPageName} </h1>
     </div>
    </> 
  )
}

export default Topnavbar;
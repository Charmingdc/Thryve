import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import './Style.css';


const Topnavbar = ({currentPageName}) => {
  const navigate = useNavigate();

  return (
    <>
     <div className='topnav'>
       <div className='topnav-icon-holder' onClick={() => navigate(-1)}>
         <FaChevronLeft className='icon' />
       </div>
           
       <h1> {currentPageName} </h1>
     </div>
    </> 
  )
}

export default Topnavbar;
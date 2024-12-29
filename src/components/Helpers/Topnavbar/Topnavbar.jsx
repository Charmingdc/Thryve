import { HiArrowLeftCircle } from "react-icons/hi2";
import './Style.css';


const handleClick = () => {
  history.back();
}


const Topnavbar = ({currentPageName}) => {
  return (
    <>
     <div className='topnav'>
       <HiArrowLeftCircle className='topnav-icon' onClick={handleClick}/>
           
       <h1> {currentPageName} </h1>
     </div>
    </> 
  )
}

export default Topnavbar;
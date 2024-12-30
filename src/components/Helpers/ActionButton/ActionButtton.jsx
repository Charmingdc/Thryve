import { useNavigate } from "react-router-dom";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import './Style.css';

const ActionButton = () => {
  const navigate = useNavigate();


  return (
    <div className='action-button' onClick={() => navigate('/add-journal')}>
      <HiOutlinePlusCircle className='icon' />
    </div>
  )  
}

export default ActionButton
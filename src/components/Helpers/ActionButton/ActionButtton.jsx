import { useNavigate } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";
import './Style.css';

const ActionButton = () => {
  const navigate = useNavigate();


  return (
    <div className='action-button' onClick={() => navigate('/add-journal')}>
      <HiOutlinePlus className='icon' />
    </div>
  )  
}

export default ActionButton
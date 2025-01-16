import './Style.css';

const MoodsBar = ({onMoodSelect}) => {
   const handleMoodClick = (mood) => {
      onMoodSelect(mood);
   }


   return (
     <div className='moods-bar'>
        <button onClick={() => handleMoodClick('grateful')}>
         <img src='/icons/grateful.png' alt='Grateful icon' className='icon' />
        </button>

        <button onClick={() => handleMoodClick('joyful')}>
         <img src='/icons/joyful.png' alt='joyful icon' className='icon' />
        </button>

        <button onClick={() => handleMoodClick('inspired')}>
         <img src='/icons/inspired.png' alt='inspired icon' className='icon' />
        </button>

        <button onClick={() => handleMoodClick('peaceful')}>
         <img src='/icons/meditate.png' alt='peaceful icon' className='icon' />
        </button>

        <button onClick={() => handleMoodClick('hopeful')}>
         <img src='/icons/hopeful.png' alt='hopeful icon' className='icon' />
        </button>
     </div>
   )
}


export default MoodsBar;
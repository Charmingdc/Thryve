import './Style.css';

const MoodsBar = ({onMoodSelect}) => {
   const handleMoodClick = (mood) => {
      onMoodSelect(mood);
   }


   return (
     <div className='moods-bar'>
        <button onClick={() => handleMoodClick('grateful')}></button>

        <button onClick={() => handleMoodClick('joyful')}></button>

        <button onClick={() => handleMoodClick('inspired')}></button>

        <button onClick={() => handleMoodClick('peaceful')}></button>

        <button onClick={() => handleMoodClick('hopeful')}></button>
     </div>
   )
}


export default MoodsBar;
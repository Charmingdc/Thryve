const getMoodPicture = async (mood) => {
  let pictureUrl = '';

  switch (mood) {
    case 'grateful':
        pictureUrl = '/icons/grateful.png';
        break;

    case 'joyful':
        pictureUrl = '/icons/joyful.png';
        break;

    case 'inspired':
        pictureUrl = '/icons/inspired.png';
        break;

    case 'peaceful':
        pictureUrl = '/icons/meditate.png';
        break;

    case 'hopeful':
        pictureUrl = '/icons/hopeful.png';
        break;
  }

  return pictureUrl;
}

export default getMoodPicture;
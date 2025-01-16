const getMoodPicture = (mood) => {
  let pictureUrl = '';

  switch (mood) {
    case 'grateful':
        pictureUrl = '/public/icons/grateful.png';
        break;

    case 'joyful':
        pictureUrl = '/public/icons/joyful.png';
        break;

    case 'inspired':
        pictureUrl = '/public/icons/inspired.png';
        break;

    case 'peaceful':
        pictureUrl = '/public/icons/meditate.png';
        break;

    case 'hopeful':
        pictureUrl = '/public/icons/hopeful.png';
        break;
  }

  return pictureUrl;
}

export default getMoodPicture;
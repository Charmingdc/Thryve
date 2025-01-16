const speechToText = () => {
  return new Promise((resolve, reject) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continous = true;
    recognition.interimResults = false;
    
    recognition.start();

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map(result => result[0].transcript)
        .join('');

      resolve(transcript);
    }

    recognition.onerror = (e) => {
      console.error(e.error);
      reject(e.error);
    }

    recognition.onend = () => {
      resolve('transcription endéd');   
    }
  });
}



export default speechToText; 
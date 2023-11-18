import { useState, useEffect } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import styles from './Nav.module.scss';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
      resetTranscript();
      // Automatically stop listening after 10 seconds
      setTimeout(() => {
        SpeechRecognition.stopListening();
        setIsListening(false);
      }, 10000);
    }
    setIsListening(!isListening);
  };

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    console.log(transcript); // Log transcript to console whenever it changes
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <div>Speech recognition not supported</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.name}>NeuroSpeak</h1>

      <div>
        {/* <p>{transcript}</p> */}
      </div>

      <div className={styles.customButton} onClick={toggleListening}>
        <MicIcon
          className={styles.mic}
          style={{
            fontSize: '26px',
            color: isListening ? 'red' : 'black',
          }}
        />
      </div>
    </div>
  );
};

export default App;

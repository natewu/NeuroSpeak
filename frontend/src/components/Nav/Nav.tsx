import 'regenerator-runtime/runtime';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { add, clear } from "redux/reducers/phrasesSlice";
import { useEffect, useState } from 'react';

import MicIcon from '@mui/icons-material/Mic';
import styles from './Nav.module.scss';
import { useDispatch } from "react-redux";
import { current } from '@reduxjs/toolkit';

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [uniqueWords, setUniqueWords] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Log unique words when listening stops
    if (!isListening && uniqueWords.length > 0) {
      const fullTranscript = uniqueWords.join(' ');
      console.log('Full Transcript:', fullTranscript);
    }
  }, [isListening, uniqueWords]);

  const toggleListening = async () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);

      const result = await sendTranscriptToServer(transcript);
      console.log('API Response:', result);

      dispatch(clear());
      dispatch(add(result.keywords));
      console.log(result.keywords);

      resetTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
      

      // Auto stop listening after 8s
      setTimeout(() => {
        SpeechRecognition.stopListening();
        setIsListening(false);

        // Transcript → Server
        // const result = await sendTranscriptToServer();
        // console.log('API Response:', result);

        // handle dispatch clear then add
        // dispatch(clear());
        // dispatch(add(result.keywords));
        // console.log(result.keywords);
      }, 8000);
    }
    setIsListening(!isListening);
  };

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    // Accumulate unique words in the 10s window
    const words = transcript.split(' ').filter((word) => word.trim() !== '');
    setUniqueWords((prevWords) => Array.from(new Set([...prevWords, ...words])));
  }, [transcript]);

  const sendTranscriptToServer = async (currentTranscript: string) => {
    try {
      const response = await fetch('http://localhost:3001/suggest-keywords', {   // mind the port number and the endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataInput: currentTranscript }),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('Error:', response.status, response.statusText);
        return { keywords: 'Error' };
      }
    } catch (error) {
      console.error('Error:', error);
      return { keywords: 'Error' }; 
    }
  };

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

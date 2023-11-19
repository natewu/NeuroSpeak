import 'regenerator-runtime/runtime';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { add, clear } from "redux/reducers/phrasesSlice";
import { useEffect, useState } from 'react';

import MicIcon from '@mui/icons-material/Mic';
import styles from './Nav.module.scss';
import { useDispatch } from "react-redux";

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
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
      resetTranscript();

      // Auto stop listening after 10s
      setTimeout(async () => {
        SpeechRecognition.stopListening();
        setIsListening(false);

        // Transcript → Server
        const result = await sendTranscriptToServer();
        console.log('API Response:', result);

        // handle dispatch clear then add
        dispatch(
          clear()
        );
        dispatch(
          add(
            result
          )
        );

      }, 10000);
    }
    setIsListening(!isListening);
  };

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    // Accumulate unique words in the 10s window
    const words = transcript.split(' ').filter((word) => word.trim() !== '');
    setUniqueWords((prevWords) => Array.from(new Set([...prevWords, ...words])));
  }, [transcript]);

  const sendTranscriptToServer = async () => {
    try {
      const response = await fetch('http://localhost:3001/suggest-keywords', {   // mind the port number and the endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataInput: uniqueWords.join(' ') }),
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





// OLD CODE (returns full transcript with duplicates)

// import { useState, useEffect } from 'react';
// import MicIcon from '@mui/icons-material/Mic';
// import styles from './Nav.module.scss';
// import 'regenerator-runtime/runtime';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const App = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [fullTranscript, setFullTranscript] = useState('');

//   useEffect(() => {
//     // Log the entire transcript when isListening becomes false
//     if (!isListening && fullTranscript.trim() !== '') {
//       console.log('Full Transcript:', fullTranscript);
//     }
//   }, [isListening, fullTranscript]);

//   const toggleListening = async () => {
//     if (isListening) {
//       SpeechRecognition.stopListening();
//     } else {
//       SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
//       resetTranscript();

//       // Automatically stop listening after 10 seconds
//       setTimeout(async () => {
//         SpeechRecognition.stopListening();
//         setIsListening(false);

//         // Send transcript to the server
//         const result = await sendTranscriptToServer();
//         console.log('API Response:', result);

//         // Handle the result as needed
//       }, 10000);
//     }
//     setIsListening(!isListening);
//   };

//   const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//   useEffect(() => {
//     // Accumulate the transcript during the 10-second period
//     setFullTranscript((prevTranscript) => prevTranscript + ' ' + transcript);
//   }, [transcript]);

//   const sendTranscriptToServer = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/suggest-keywords', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ dataInput: fullTranscript.trim() }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         return result; // Return the result
//       } else {
//         console.error('Error:', response.status, response.statusText);
//         return { keywords: 'Error' }; // Handle the error case
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       return { keywords: 'Error' }; // Handle the error case
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <div>Speech recognition not supported</div>;
//   }

//   return (
//     <div className={styles.wrapper}>
//       <h1 className={styles.name}>NeuroSpeak</h1>

//       <div>
//         {/* <p>{transcript}</p> */}
//       </div>

//       <div className={styles.customButton} onClick={toggleListening}>
//         <MicIcon
//           className={styles.mic}
//           style={{
//             fontSize: '26px',
//             color: isListening ? 'red' : 'black',
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;
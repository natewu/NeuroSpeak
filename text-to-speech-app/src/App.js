import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = React.useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const speak = () => {
    if (text !== '') {
      const utterance = new SpeechSynthesisUtterance(text);

      // get all avaialble voices and find an English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => voice.lang.startsWith('en'));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      speechSynthesis.speak(utterance)
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type something here..."
      />
      <button onClick={speak}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
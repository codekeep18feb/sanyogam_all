import React from 'react';

const SpeakButton = () => {
  const speak = () => {
    const message = new SpeechSynthesisUtterance('Hello');
    window.speechSynthesis.speak(message);
  };

  return (
    <div onClick={speak} style={{ cursor: 'pointer', padding: '20px', border: '1px solid #ccc' }}>
      Click me to speak
    </div>
  );
};

function Speaker() {
  return (
    <div className="Speaker">
      <h1>React Speech Speaker</h1>
      <SpeakButton />
    </div>
  );
}

export default Speaker;

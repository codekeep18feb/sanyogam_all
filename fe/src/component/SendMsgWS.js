import React, { useState } from 'react';
import io from 'socket.io-client';

const SendMsgWS = () => {
  const [socket, setSocket] = useState(io.connect('http://localhost:8000'));
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedPrefix, setSelectedPrefix] = useState(null);

  const handlePrefixChange = (event) => {
    setSelectedPrefix(event.target.value);
  };

  const sendMessage = () => {
    const prefix = selectedPrefix || 'AC'; // Use 'AC' as the default prefix
    const message = prefix + messageInput;
    console.log('werewehere 2nd time')
    socket.emit('message', message);
    setMessageInput('');
  };

  React.useEffect(() => {
    socket.on('message', (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.disconnect();
    console.log('will it only run if unmounting is happening')
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Echo</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

      <div>
        <label>
          <input
            type="radio"
            name="prefix"
            value="AC"
            defaultChecked={selectedPrefix === null || selectedPrefix === 'AC'}
            onChange={handlePrefixChange}
          />{' '}
          AC
        </label>
        <label>
          <input
            type="radio"
            name="prefix"
            value="DC"
            checked={selectedPrefix === 'DC'}
            onChange={handlePrefixChange}
          />{' '}
          DC
        </label>
      </div>

      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={(e)=>{
        e.preventDefault()
        sendMessage()
      }}>Send</button>
    </div>
  );
};

export default SendMsgWS;

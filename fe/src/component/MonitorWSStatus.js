import React, { useState } from 'react';
import io from 'socket.io-client';

const MonitorWSStatus = () => {
  const [socket, setSocket] = useState(io.connect('http://192.168.1.13:8000'));
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedPrefix, setSelectedPrefix] = useState('AC');

  const handlePrefixChange = (event) => {
    setSelectedPrefix(event.target.value);
  };

  const sendMessage = () => {
    const message = selectedPrefix + messageInput;
    socket.emit('message', message);
    setMessageInput('');
  };

  React.useEffect(() => {
    socket.on('message', (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages, socket]);

  return (
    <div>
      <h1>WebSocket Echo</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      
     
    </div>
  );
};

export default MonitorWSStatus;

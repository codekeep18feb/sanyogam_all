// Socket.js
import io from 'socket.io-client';

const socket = io.connect('http://192.168.1.13:8000');

export default socket;
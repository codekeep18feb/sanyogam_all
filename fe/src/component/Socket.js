// Socket.js
import io from "socket.io-client";

const socket = io.connect('http://192.168.1.11:8001');

export default socket;

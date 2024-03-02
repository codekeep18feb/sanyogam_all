console.log('amyscript')

let socket = io('ws://192.168.1.5:8001');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

socket.on('error', (error) => {
  console.error('WebSocket error:', error);
});

socket.on('custom_event', (data) => {
  console.log('Received custom event:', data);
  // Handle the custom event data here
});
const WebSocket = require('ws');
const signalingRoutes = require('./SignalingRoutes');

// Initialize a WebSocket Server on a specific port
const wss = new WebSocket.Server({ port: 5000 });

// Log when the server starts
console.log('Signaling server started on ws://localhost:5000');

// Pass the WebSocket server to the signaling routes
signalingRoutes(wss);

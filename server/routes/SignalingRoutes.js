// This is a Node.js module for handling signaling in your server.

// You should already have a WebSocket server set up and passed into this module.
module.exports = function (wss) {
    wss.on('connection', function (ws) {
      console.log('Client connected to signaling channel.');
  
      ws.on('message', function (message) {
        console.log('Received message:', message);
        // Parse the message and handle it appropriately.
        // Typically, you would want to identify the type of message
        // and broadcast it to the other peer(s) involved in the connection.
        
        const parsedMessage = JSON.parse(message);
  
        switch (parsedMessage.type) {
          case 'offer':
          case 'answer':
          case 'ice-candidate':
            // For the purpose of this example, we broadcast the message to all connected clients.
            // In a real application, you would only send the message to the specific client
            // that is supposed to receive it, based on your application logic.
            wss.clients.forEach(function (client) {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
              }
            });
            break;
          // Handle other message types as necessary.
        }
      });
  
      ws.on('close', function () {
        console.log('Client has disconnected.');
      });
    });
  };
  
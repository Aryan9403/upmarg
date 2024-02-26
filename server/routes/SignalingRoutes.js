// SignalingRoutes.js

module.exports = function (wss) {
    const channels = {};
  
    wss.on('connection', function (ws) {
      ws.on('message', function (message) {
        const data = JSON.parse(message);
  
        switch (data.type) {
          case 'join':
            // A user wants to join or create a channel
            const channel = data.channel;
            if (!channels[channel]) {
              channels[channel] = [];
            }
            channels[channel].push(ws);
            break;
          case 'offer':
          case 'answer':
          case 'ice-candidate':
            // Send message to peers in the same channel
            const peers = channels[data.channel] || [];
            peers.forEach(peer => {
              if (peer !== ws && peer.readyState === WebSocket.OPEN) {
                peer.send(message);
              }
            });
            break;
          // Add additional cases as needed
        }
      });
  
      ws.on('close', function () {
        // Remove the client from all channels
        Object.keys(channels).forEach(channel => {
          channels[channel] = channels[channel].filter(peer => peer !== ws);
        });
      });
    });
  };
  
import React, { useEffect, useRef, useContext } from 'react';
import { WebSocketContext } from './WebSocketContext'; // Assume you have a context for WebSocket

const Signaling = ({ channel }) => {
  const ws = useContext(WebSocketContext); // Obtain WebSocket connection from context
  const pc = useRef(new RTCPeerConnection());

  useEffect(() => {
    // Send a message to join the specific channel
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'join', channel }));
    } else {
      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({ type: 'join', channel }));
      }, { once: true });
    }

    // Handle ICE candidates
    pc.current.onicecandidate = event => {
      if (event.candidate) {
        ws.send(JSON.stringify({
          type: 'ice-candidate',
          candidate: event.candidate,
          channel: channel
        }));
      }
    };

    // Handle incoming media stream track
    pc.current.ontrack = event => {
      // Here you would handle the incoming media stream track, such as assigning it to a video element to display
    };

    // Handle messages from the signaling server
    const handleMessage = async (message) => {
      const data = JSON.parse(message.data);
      
      switch(data.type) {
        case 'offer':
          await pc.current.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await pc.current.createAnswer();
          await pc.current.setLocalDescription(answer);
          ws.send(JSON.stringify({
            type: 'answer',
            answer: answer,
            channel: channel
          }));
          break;
        case 'answer':
          await pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
          break;
        case 'ice-candidate':
          if (data.candidate) {
            await pc.current.addIceCandidate(new RTCIceCandidate(data.candidate));
          }
          break;
        // ... other message types as needed
      }
    };

    ws.addEventListener('message', handleMessage);

    return () => {
      // Cleanup WebSocket listeners when the component unmounts
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws, channel]); // Added 'channel' as a dependency to the useEffect hook

  // Signaling component does not render anything
  return null;
};

export default Signaling;

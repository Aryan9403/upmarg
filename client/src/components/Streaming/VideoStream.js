import React, { useEffect, useRef } from 'react';

const VideoStream = () => {
  const localVideoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    };

    getMedia();
  }, []);

  return (
    <video ref={localVideoRef} controls autoPlay playsInline muted></video>
  );
};

export default VideoStream;

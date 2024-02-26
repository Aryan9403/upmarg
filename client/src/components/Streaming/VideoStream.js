import React, { useEffect, useRef } from 'react';

const VideoStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error('Error accessing media devices.', err);
      });
  }, []);

  return <video ref={videoRef} controls autoPlay></video>;
};

export default VideoStream;

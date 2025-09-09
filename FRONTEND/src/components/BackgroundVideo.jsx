// BackgroundVideo.jsx
import React from 'react';

const BackgroundVideo = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Optional overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>
    </div>
  );
};

export default BackgroundVideo;

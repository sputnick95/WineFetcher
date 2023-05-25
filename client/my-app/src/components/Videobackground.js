import React from "react";
import ReactPlayer from "react-player";

const VideoBackground = () => {
  return (
    <div className="video-background">
      <ReactPlayer
        url="https://www.example.com/video.mp4"
        playing={true}
        loop={true}
        muted={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoBackground;
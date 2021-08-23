import React from "react";
import "./VideoShow.css";
let VideoShow = (props) => {
  console.log(props.post.length);

  return (
    <div className="video_holder">
      <div id="video_insideHolder">
        <video className="video_view" src={props.post} />
      </div>
    </div>
  );
};

export default VideoShow;

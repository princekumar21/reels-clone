import React from "react"
import "./VideoHeader.css"
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";



function VideoHeader() {
    return (
      <div className="videoHeader">
        <KeyboardBackspaceOutlinedIcon />
        <h5>Reels</h5>
        <CameraAltOutlinedIcon />
      </div>
    );
}

export default VideoHeader; 
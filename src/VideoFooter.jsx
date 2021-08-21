import React, { useContext, useState, useEffect } from "react";
import "./VideoFooter.css";
import Ticker from "react-ticker";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined";
import { firestore } from "./firebase";
import { Avatar, Button } from "@material-ui/core";
import { AuthContext } from "./AuthProvider";
import SendIcon from "@material-ui/icons/Send";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {Link, Redirect} from "react-router-dom"

function VideoFooter(props) {
  let value = useContext(AuthContext);
  const [color, setColor] = useState(false);

  // console.log(props.post.didLikes);
  //  console.log(props.post.id);
  

  useEffect(() => {
    let f = async () => {
      let querySnapShot = await firestore
        .collection("posts")
        .doc(props.post.id)
        .get();

       

        setColor(querySnapShot.data().didLikes);
      
    };
    f();
  });

  return (
    <div className="video_footer">
      <div className="videofooter_actionleft">
        <div className="videofooter_text">
          {/* {console.log(value.photoURL)} */}
         { value?.photoURL ? <Avatar src={value.photoURL}/> : <Redirect to="/home" />}
          <p>
            {value?.displayName} •<Button>Follow</Button>
          </p>
        </div>
        <div className="videofooter_ticker">
          <MusicNoteOutlinedIcon className="music_icon" />
          <Ticker className="ticker_song" mode="smooth">
            {({ index }) => (
              <>
                <p> • Main Yahoon </p>
              </>
            )}
          </Ticker>
        </div>
      </div>
      <div className="videofooter_actionright">
        <FavoriteIcon
          style={color ? { color: "red" } : { color: "#ffffff" }}
          fontSize="large"
          className="like"
          onClick={(event) => {
            if (color) {
              
              event.target.style.color = "#ffffff";
             
              firestore.collection("posts").doc(props.post.id).update({
                didLikes: false,
              });
            } else {
              event.target.style.color = "red";
              firestore.collection("posts").doc(props.post.id).update({
                didLikes: true,
              });
            }
          }}
        />
        <div id="comment_viewer">
          <ModeCommentOutlinedIcon
            fontSize="large"
            className="comment"
            onClick={() => {
              props.boxOpen
                ? props.commentBoxHandler(false)
                : props.commentBoxHandler(true);
            }}
          />
          <p>{props.commentCount}</p>
        </div>
        <SendIcon />
        <MoreVertIcon />
        <Link to="/profile">
          <div className="square_profile">
            <img src={value?.photoURL} alt="Not available" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default VideoFooter;

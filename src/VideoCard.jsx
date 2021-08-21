import React, { useState, useRef, useContext, useEffect } from "react";
import VideoHeader from "./VideoHeader";
import VideoFooter from "./VideoFooter";
import "./VideoCard.css";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import Input from "@material-ui/core/Input";
import SendIcon from "@material-ui/icons/Send";

import { Avatar } from "@material-ui/core";
import { AuthContext } from "./AuthProvider";
import { firestore } from "./firebase";
import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";

let VideoCard = (props) => {
  const [boxOpen, setBoxopen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currUserComment, setCurrUserComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  
 
  useEffect(() => {
    let f = async () => {
      
      let allCommentId = props.post.comment;
      
      if(allCommentId == undefined){
        setCommentCount(0);
      }else{
        setCommentCount(allCommentId.length);
         let arr = [];
         for (let i = 0; i < allCommentId.length; i++) {
           let id = allCommentId[i];

           let doc = await firestore.collection("comments").doc(id).get();
           let commentData = { ...doc.data(), id: doc.id };
           arr.push(commentData);
         }

         setAllComment(arr);
      }
     
       
    };

    f();
  }, [props]);

  let value = useContext(AuthContext);

  const videoRef = useRef(false);

  const onVideoPress = () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  let commentBoxHandler = (data) => {
    setBoxopen(data);
  };

  return (
    <div className="videoCard">
      <VideoHeader />
      <video
        ref={videoRef}
        onClick={onVideoPress}
        className="videoCard_player"
        src={props.post.url}
        loop={true}
      />
      <VideoFooter
        post={props.post}
        boxOpen={boxOpen}
        commentBoxHandler={commentBoxHandler}
        commentCount={commentCount}
      />
      {boxOpen ? (
        <div className="comment_box">
          <div id="comment_backButton">
            <ArrowBackTwoToneIcon
              onClick={() => setBoxopen(false)}
              className="comment_close"
            />
            <h6 id="comment_text">Comments</h6>
          </div>
          <div className="display_allComment">
            {allComment.map((comment, index) => {
              return (
                <div className="single_comment">
                  <img src={value.photoURL} id="comment_profile" />
                  <p className="comment_username">{value.displayName}</p>
                  <p key={index} id="commment_comment">
                    {comment.comment}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="message_Comment">
            <Avatar className="comment_profile" src={value.photoURL} />
            <Input
              placeholder="Add a comment..."
              className="comment_input"
              value={currUserComment}
              onChange={(event) => {
                setCurrUserComment(event.currentTarget.value);
              }}
            />
            <SendIcon
              className="comment_postIcon"
              onClick={() => {
                let p = firestore.collection("comments").add({
                  comment: currUserComment,
                  username: value.displayName,
                  pic: value.photoURL,
                });

                setCurrUserComment("");

                p.then((docRef) => {
                  return docRef.get();
                }).then((doc) => {
                  firestore
                    .collection("posts")
                    .doc(props.post.id)
                    .update({
                      comment: [...props.post.comment, doc.id],
                    });
                });
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default VideoCard;

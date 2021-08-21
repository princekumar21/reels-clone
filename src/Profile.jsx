import "./Profile.css";
import { firestore } from "./firebase";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Redirect , Link} from "react-router-dom";
import VideoShow from "./VideoShow";

import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";

let Profile = () => {
  let value = useContext(AuthContext);
  const [noOfPost, setNoOfPost] = useState(0);
  const [postUrl, setPostUrl] = useState([]);
  const [noOfComment, setNoofComment] = useState([]);

 

  useEffect(() => {
    let arr = [];
    let f = async () => {
      let querySnapShot = await firestore
        .collection("posts")
        .where("emailId", "==", value.email)
        .get();
      setNoOfPost(querySnapShot.size);
      querySnapShot.docs.map((doc) => {
        setNoofComment(doc.data().comment);
        arr.push(doc.data().url);
      });
      if(arr.length !== undefined){

        setPostUrl(arr);
      }
    };

    f();
  }, []);

  return (
    <>
      {value ? (
        <div id="profile_viewer">
          <div id="back_button">
            <Link to="/home">
              <ArrowBackTwoToneIcon />
              <h3 id="reels">Reels</h3>
            </Link>
          </div>
          <div id="profile_info">
            <img src={value.photoURL} id="image" />
            <h3>{value.displayName}</h3>
            <h6>No of Post : {noOfPost}</h6>
            <h6>
              No of Comments :{" "}
              {noOfComment.length == undefined ? 0 : noOfComment.length}
            </h6>
          </div>
          <div className="profile_video">
            {postUrl.length == 0 ? (
              <>
                <h3>No Post uploaded</h3>
              </>
            ) : (
              postUrl.map((post, index) => {
                return <VideoShow key={index} post={post} />;
              })
            )}
            
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Profile;

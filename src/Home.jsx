import React, { useState, useContext, useEffect } from "react";
import { auth, storage, firestore } from "./firebase";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import "./Home.css";
import { AuthContext } from "./AuthProvider";

function Home() {
  let value = useContext(AuthContext);
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    let unsubscription = firestore
      .collection("posts")
      .onSnapshot((querySnapShot) => {
        setPosts(
          querySnapShot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );

        // this invokes when we leave home component and it will Unsubscribe
        // it works like componentWillUnmount

        return () => {
          unsubscription();
        };
      });
  }, []);

  return (
    <div>
      <div className="posts_container">
        <div className="post_video">
          {posts.map((post, index) => (
            <VideoCard key={index} post={post} />
          ))}
        </div>
      </div>
      {value ? (
        <>
          <Link to="/profile">
            <button
              type="button"
              className="btn btn-primary m-4 profile_button"
            >
              Profile
            </button>
          </Link>

          <input
            onClick={(e) => {
              // if we upload the same file with same name and extension it will
              //  not upload to the database means onchange will not work
              //  to avoid that evertime we are clicking choosefile we are changing the curent
              e.currentTarget.value = null;
            }}
            type="file"
            className="upload_bttn"
            onChange={(e) => {
              if (!e.currentTarget.files[0]) return;

              let { type, size } = e.currentTarget.files[0];

              let file = e.currentTarget.files[0];
              type = type.split("/")[0];

              size /= 1048576;

              if (type !== "video" || size > 10) {
                alert(
                  "only upload file with mp4 extension and size less than 10MB"
                );
              } else {
                let f1 = (snapshot) => {
                  // let bytesTrans = uploadTask.snapshot.bytesTransferred;
                  // let totalBytes = uploadTask.snapshot.totalBytes;
                };

                let f2 = (error) => {};

                let f3 = () => {
                  let p = uploadTask.snapshot.ref.getDownloadURL();
                  p.then((url) => {
                    firestore.collection("posts").add({
                      username: value.displayName,
                      emailId: value.email,
                      url: url,
                      photoUrl: value.photoURL,
                      likes: 0,
                      didLikes: false,
                      comment: [],
                    });
                  });
                };

                let uploadTask = storage
                  .ref(`/path/${value.uid}/${Date.now() + value.displayName}`)
                  .put(file);

                uploadTask.on("state_changed", f1, f2, f3);
              }
            }}
          />
          <button
            type="button"
            className="btn btn-primary m-4 logout_button"
            onClick={() => {
              auth.signOut();
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default Home;

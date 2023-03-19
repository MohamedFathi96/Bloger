import { onSnapshot, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import { useDatabaseContext } from "../context/DatabaseContext";
import Alert from "@mui/material/Alert";
import { AlertTitle, Fade } from "@mui/material";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { postsRef, posts, setposts, searchValue } = useDatabaseContext();
  const message = useLocation().state;
  useEffect(() => {
    const postQuery = query(postsRef);
    onSnapshot(postQuery, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setposts(articles);
    });
  }, []);
  return (
    <div>
      {/* {message && (
        <Alert
          variant="filled"
          onClose={(e) => {

          }}
          sx={{
            position: "fixed",
            top: "30px",
            left: "50%",
            zIndex: 100,
            transform: "translateX(-50%)",
          }}
          severity={`${message ? message.severity : ""}`}
        >
          {message.title}
        </Alert>
      )} */}
      <div className="ml-56 p-12 flex items-center min-h-screen flex-col gap-4 dark:text-white dark:bg-main-dark-bg">
        {posts.map((postData) => (
          <Post key={postData.id} data={postData} />
        ))}
      </div>
    </div>
  );
};

export default Home;

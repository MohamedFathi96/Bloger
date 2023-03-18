import { onSnapshot, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import { useDatabaseContext } from "../context/DatabaseContext";

const Home = () => {
  const [posts, setposts] = useState([]);
  const { postsRef } = useDatabaseContext();
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
      <div className="ml-56 p-12 flex items-center min-h-screen flex-col gap-4 dark:text-white dark:bg-main-dark-bg">
        {posts.map((postData) => (
          <Post key={postData.id} data={postData} />
        ))}
      </div>
    </div>
  );
};

export default Home;

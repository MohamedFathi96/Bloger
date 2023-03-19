import { getDocs, limit, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import Post from "../components/Post";
import { useDatabaseContext } from "../context/DatabaseContext";
import { useParams } from "react-router-dom";

const Home = () => {
  const { postsRef, posts, setposts } = useDatabaseContext();
  const { category } = useParams();
  useEffect(() => {
    const postQuery = query(postsRef, limit(10));
    onSnapshot(postQuery, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setposts(articles);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const postQuery = category
      ? query(postsRef, where("category", "==", category), limit(10))
      : query(postsRef, limit(10));
    getDocs(postQuery).then((snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setposts(articles);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
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

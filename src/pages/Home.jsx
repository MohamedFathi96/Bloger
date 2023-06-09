import {
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import Post from "../components/Post";
import { useDatabaseContext } from "../context/DatabaseContext";
import { useParams } from "react-router-dom";

const Home = () => {
  const { postsRef, posts, setposts } = useDatabaseContext();
  const { category } = useParams();
  useEffect(() => {
    const postQuery = query(postsRef, limit(10), orderBy("createdAt", "desc"));
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
      ? query(
          postsRef,
          where("category", "==", category),
          limit(10),
          orderBy("createdAt", "desc")
        )
      : query(postsRef, limit(10), orderBy("createdAt", "desc"));
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
      <div className="md:ml-56 dark:text-white min-h-screen pb-4 dark:bg-main-dark-bg px-2 sm:px-0">
        <div className="flex flex-wrap gap-4 justify-center">
          {posts.map((postData) => (
            <Post key={postData.id} data={postData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

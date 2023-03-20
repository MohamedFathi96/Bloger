import React, { useEffect, useState } from "react";
import { useDatabaseContext } from "../context/DatabaseContext";
import { useAuthContext } from "../context/AuthContext";
import Post from "../components/Post";
import { getDocs, query, where } from "firebase/firestore";

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { currentUser } = useAuthContext();
  const { postsRef } = useDatabaseContext();
  useEffect(() => {
    const postQuery = query(
      postsRef,
      where("creatorId", "==", currentUser.uid)
    );
    getDocs(postQuery).then((snapshot) => {
      if (snapshot.docs.length === 0) setUserPosts(0);
      const userPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserPosts(userPosts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="md:ml-56 dark:text-white min-h-screen pb-4 dark:bg-main-dark-bg px-2 sm:px-0">
        <div className="flex flex-wrap gap-4 justify-center">
          {userPosts.map((postData) => (
            <Post key={postData.id} data={postData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPosts;

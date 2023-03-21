import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useDatabaseContext } from "../context/DatabaseContext";
import Post from "../components/Post";
import {
  getDocs,
  query,
  where,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
const UserFavorites = () => {
  const { database } = useDatabaseContext();
  const { currentUser } = useAuthContext();
  const [favoritePosts, setfavoritePosts] = useState([]);
  useEffect(() => {
    const userQery = query(
      collection(database, "UsersInfo"),
      where("userId", "==", currentUser.uid)
    );
    getDocs(userQery).then((snapshot) => {
      const { favorites } = snapshot.docs[0].data();
      if (favorites.length === 0) setfavoritePosts(0);

      const tempFavPosts = [];
      favorites.forEach((favId) => {
        const singleFavRef = doc(database, "Posts", favId);
        getDoc(singleFavRef).then((snapshot) => {
          tempFavPosts.push({
            ...snapshot.data(),
            id: snapshot.id,
          });
          setfavoritePosts(tempFavPosts);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="md:ml-56 dark:text-white min-h-screen pb-4 dark:bg-main-dark-bg px-2 sm:px-0">
        <div className="flex flex-wrap gap-4 justify-center">
          {favoritePosts &&
            favoritePosts.map((postData) => (
              <Post key={postData.id} data={postData} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserFavorites;

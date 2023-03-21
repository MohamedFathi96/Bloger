import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { BsSearchHeart, BsPatchPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDatabaseContext } from "../context/DatabaseContext";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import BadgeIcon from "@mui/icons-material/Badge";
// import { getDocs, where, query } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  // function searchPosts(e) {
  //   setsearchValue(e.target.value);
  //   const postQuery = query(postsRef, where("title", "==", e.target.value));
  //   getDocs(postQuery)
  //     .then((snapshot) => {
  //       snapshot.docs.map((doc) => {
  //         const newPost = {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //         setposts((prev) => [...prev, newPost]);
  //         console.log("asdf");
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <div className="pb-12 md:ml-56 flex justify-between py-6 px-8 gap-10 dark:bg-main-dark-bg items-center dark:text-white">
      <h1
        style={{ fontFamily: '"Aladin", cursive' }}
        className="text-3xl italic up"
      >
        <Tooltip title="Home">
          <Link to="/">Blog&nbsp;Club</Link>
        </Tooltip>
      </h1>
      <div className="flex items-center focus-within:flex-1 transition-all duration-300 up">
        <BsSearchHeart
          className="text-black dark:text-white hidden sm:block"
          style={{ fontSize: "1.3rem" }}
        />
        <input
          className="px-3 outline-none grow dark:bg-main-dark-bg hidden sm:block"
          placeholder="Search Something..."
          type="text"
        />
      </div>
      <div>
        {!currentUser && (
          <Tooltip title="Sign In Or Create An Account">
            <button className="px-3 py-2 bg-accent-yellow rounded-lg mr-4 text-black up">
              <Link to="/login">Sign In</Link>
            </button>
          </Tooltip>
        )}

        {currentUser && (
          <>
            <div className="flex gap-1">
              <Tooltip title="My Posts">
                <button
                  onClick={() => navigate("/user/posts")}
                  className="hover:bg-gray-600 p-1 up rounded-full hover:text-white"
                >
                  <BadgeIcon sx={{ fontSize: "1.8rem" }} />
                </button>
              </Tooltip>
              <Tooltip title="Favorites">
                <button
                  onClick={() => navigate("/user/favorites")}
                  className="hover:bg-gray-600 up p-1 rounded-full hover:text-white"
                >
                  <StarPurple500Icon sx={{ fontSize: "2.1rem" }} />
                </button>
              </Tooltip>
              <Tooltip title="New Post">
                <button className="up hover:bg-gray-600 p-1 rounded-full hover:text-white">
                  <Link state={null} to="/write">
                    <BsPatchPlus
                      style={{
                        fontSize: "1.8rem",
                        verticalAlign: "middle",
                        display: "inline-block",
                      }}
                    />
                  </Link>
                </button>
              </Tooltip>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;

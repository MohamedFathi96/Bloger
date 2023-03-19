import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { BsSearchHeart, BsPatchPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDatabaseContext } from "../context/DatabaseContext";
import { getDocs, where, query } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { searchValue, setsearchValue } = useDatabaseContext();
  const { currentUser } = useAuthContext();

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
    <div className="pb-12 ml-56 flex justify-between py-6 px-8 gap-10 dark:bg-main-dark-bg items-center dark:text-white">
      <h1
        style={{ fontFamily: '"Aladin", cursive' }}
        className="text-3xl italic"
      >
        <Tooltip title="Home">
          <Link to="/">Blog Club</Link>
        </Tooltip>
      </h1>
      <div className="flex items-center focus-within:flex-1 transition-all duration-300 up">
        <BsSearchHeart style={{ fontSize: "1.3rem", fill: "#fff" }} />
        <input
          className="px-3 outline-none grow dark:bg-main-dark-bg"
          placeholder="Search Something..."
          type="text"
          value={searchValue}
          onChange={(e) => setsearchValue(e.target.value)}
        />
      </div>
      <div>
        {!currentUser && (
          <Tooltip title="Sign In Or Create An Account">
            <button className="px-3 py-2 bg-accent-yellow rounded-lg mr-4 text-black">
              <Link to="/login">Sign In</Link>
            </button>
          </Tooltip>
        )}
        <Tooltip title="New Post">
          <button className="up">
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
    </div>
  );
};

export default NavBar;

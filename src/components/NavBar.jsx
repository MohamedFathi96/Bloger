import React from "react";
import { BsSearchHeart } from "react-icons/bs";

const NavBar = () => {
  return (
    <div className="ml-56 flex justify-between py-6 px-4 gap-3 dark:bg-main-dark-bg items-center dark:text-white">
      <h1
        style={{ fontFamily: '"Aladin", cursive' }}
        className="text-3xl italic"
      >
        Blog Club
      </h1>
      <div className="flex items-center focus-within:flex-1 transition-all duration-300">
        <BsSearchHeart style={{ fontSize: "1.3rem", fill: "#fff" }} />
        <input
          className="px-3 outline-none grow dark:bg-main-dark-bg"
          placeholder="Search Something..."
          type="text"
        />
      </div>
      <div>
        <button className="px-3 py-2 bg-accent-yellow rounded-lg mr-4 text-black">
          Upgrage
        </button>
        <button className="font-bold text-2xl border border-gray-400 p-1 align-middle rounded-lg">
          +
        </button>
      </div>
    </div>
  );
};

export default NavBar;

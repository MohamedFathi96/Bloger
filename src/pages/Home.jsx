import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Post from "../components/Post";

const Home = () => {
  return (
    <div>
      <NavBar />
      <SideBar />
      <div className="ml-56">
        <Post />
      </div>
    </div>
  );
};

export default Home;

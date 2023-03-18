import React from "react";
import person from "../assets/avatar.jpg";
import Switch from "@mui/material/Switch";
import {
  FcApproval,
  FcBearish,
  FcClapperboard,
  FcSportsMode,
  FcElectronics,
} from "react-icons/fc";
import { IoFastFoodOutline } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";

const SideBar = () => {
  const { setMode, currentUser } = useAuthContext();
  const changeMode = () => {
    setMode((prevMode) => {
      if (prevMode === "dark") return "light";
      return "dark";
    });
  };
  return (
    <div className="fixed py-9 w-56 left-0 top-0 border-r-gray-700 border-r-2 h-screen dark:text-white dark:bg-main-dark-bg flex flex-col items-center">
      {/* -------------------First Element-------------------  */}
      <div className="text-center">
        <img
          style={{ maxWidth: "6rem" }}
          className="rounded-full"
          src={person}
          alt="person"
        />
        <p className="my-2">{currentUser.displayName}</p>
        <Tooltip title="Edit Profile">
          <button className="text-gray-400 py-0.5 px-5 border rounded-xl border-white">
            Edit
          </button>
        </Tooltip>
      </div>
      {/* -------------------Second Element-------------------  */}
      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl">
          <FcApproval style={{ fontSize: "1.3rem" }} />
          <NavLink to="/">General</NavLink>
        </div>
        <div className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl">
          <FcBearish style={{ fontSize: "1.3rem" }} />
          <NavLink to="/financial">Financial</NavLink>
        </div>
        <div className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl">
          <IoFastFoodOutline style={{ fontSize: "1.3rem", color: "#9186df" }} />
          <NavLink to="/food">Food</NavLink>
        </div>
        <div className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl">
          <FcClapperboard style={{ fontSize: "1.3rem", color: "#9186df" }} />
          <NavLink to="/movies">Movies</NavLink>
        </div>
        <div className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl">
          <FcSportsMode style={{ fontSize: "1.3rem", color: "#9186df" }} />
          <NavLink to="/health">Health</NavLink>
        </div>
        <div className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl">
          <FcElectronics style={{ fontSize: "1.3rem", color: "#9186df" }} />
          <NavLink to="/technology">Technology</NavLink>
        </div>
      </div>
      {/* -------------------Third Element-------------------  */}
      <div className="justify-self-end mt-auto">
        <span>Light</span>
        <Switch
          onChange={changeMode}
          defaultChecked
          color="warning"
          inputProps={{ "aria-label": "controlled" }}
        />
        <span>Dark</span>
      </div>
    </div>
  );
};

export default SideBar;

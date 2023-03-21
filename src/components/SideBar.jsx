import React, { useEffect } from "react";
import Switch from "@mui/material/Switch";
import { BsPersonCircle } from "react-icons/bs";
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
  const {
    setMode,
    currentUser,
    logOut,
    screenSize,
    setActiveMenu,
    activeMenu,
  } = useAuthContext();
  const changeMode = () => {
    setMode((prevMode) => {
      if (prevMode === "dark") return "light";
      return "dark";
    });
  };
  useEffect(() => {
    if (screenSize <= 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);
  return (
    <div
      className={`${
        activeMenu ? "w-56" : "w-0"
      } fixed transition-all py-5 pb-9 z-20 overflow-hidden left-0 top-0 border-r-gray-700 right-shadow h-screen dark:text-white dark:bg-main-dark-bg flex flex-col items-center`}
    >
      {/* -------------------First Element-------------------  */}
      <div className="text-center flex flex-col items-center">
        <div>
          <BsPersonCircle style={{ fontSize: "4rem" }} />
        </div>
        <p className="my-2">
          {currentUser ? currentUser.displayName : "Welocome, Guest"}
        </p>
        {currentUser && (
          <>
            <Tooltip title="Log Out">
              <button
                onClick={logOut}
                className="text-gray-400 py-0.5 px-5 border rounded-xl border-white"
              >
                Sign Out
              </button>
            </Tooltip>
          </>
        )}
      </div>
      {/* -------------------Second Element-------------------  */}
      <div className="flex flex-col gap-3 mt-auto">
        <div
          onClick={() => {
            if (screenSize <= 768) setActiveMenu(false);
          }}
          className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl"
        >
          <FcApproval style={{ fontSize: "1.3rem" }} />
          <NavLink to="/">General</NavLink>
        </div>
        <div
          onClick={() => {
            if (screenSize <= 768) setActiveMenu(false);
          }}
          className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl"
        >
          <FcBearish style={{ fontSize: "1.3rem" }} />
          <NavLink to="/financial">Financial</NavLink>
        </div>
        <div
          onClick={() => {
            if (screenSize <= 768) setActiveMenu(false);
          }}
          className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl"
        >
          <IoFastFoodOutline style={{ fontSize: "1.3rem", color: "#9186df" }} />
          <NavLink to="/food">Food</NavLink>
        </div>
        <div
          onClick={() => {
            if (screenSize <= 768) setActiveMenu(false);
          }}
          className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl"
        >
          <FcClapperboard style={{ fontSize: "1.3rem", color: "#9186df" }} />
          <NavLink to="/movies">Movies</NavLink>
        </div>
        <div
          onClick={() => {
            if (screenSize <= 768) setActiveMenu(false);
          }}
          className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl"
        >
          <FcSportsMode style={{ fontSize: "1.3rem", color: "#9186df" }} />
          <NavLink to="/health">Health</NavLink>
        </div>
        <div
          onClick={() => {
            if (screenSize <= 768) setActiveMenu(false);
          }}
          className="flex items-center text-xl gap-2 py-2 px-8 italic rounded-2xl"
        >
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

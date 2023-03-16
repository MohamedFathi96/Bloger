import React from "react";
import person from "../assets/avatar.jpg";
import Switch from "@mui/material/Switch";
import { useAuthContext } from "../context/AuthContext";

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
      <div className="text-center">
        <img
          style={{ maxWidth: "6rem" }}
          className="rounded-full"
          src={person}
          alt="person"
        />
        <p className="my-2">{currentUser.displayName}</p>
        <button className="text-gray-400 py-0.5 px-5 border rounded-xl border-white">
          Edit
        </button>
      </div>
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

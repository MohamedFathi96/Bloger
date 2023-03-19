import React from "react";
import { Link } from "react-router-dom";
import person from "../assets/avatar.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Tooltip } from "@mui/material";
const Post = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 max-w-md bg-main-white-bg dark:bg-secondary-dark-bg p-5 rounded-2xl">
      <div className="flex gap-4">
        <img
          src={person}
          style={{ maxWidth: "40px" }}
          className="rounded-full"
          alt="user"
        />
        <div>
          <p>Mohamed Fathi</p>
          <p>September 14, 2016</p>
        </div>
      </div>
      {/* <div> */}
      <img className="rounded-2xl max-h-52" src={data.img} alt="post" />
      {/* </div> */}
      <div className="flex flex-col gap-5 flex-grow">
        <h1 className="font-bold text-2xl up">{data.title}</h1>
        <p className="up max-h-24 overflow-hidden">{data.description}</p>
        <div className="flex justify-between mt-auto">
          <button
            type="button"
            className="bg-slate-200 text-black px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 up"
          >
            <Link state={data} to={`/post/${data.id}`}>
              Read More
            </Link>
          </button>

          <div className="flex gap-2 mt-auto">
            <Tooltip title="Add To Favorites">
              <span className="cursor-pointer">
                <FavoriteIcon />
              </span>
            </Tooltip>
            <Tooltip title="Dislike">
              <span className="cursor-pointer">
                <ThumbDownIcon />
              </span>
            </Tooltip>
            <Tooltip title="Like">
              <span className="cursor-pointer">
                <ThumbUpIcon />
              </span>
            </Tooltip>
            <Tooltip title="Add a comment">
              <span className="cursor-pointer">
                <ModeCommentIcon />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
// #75a2c6

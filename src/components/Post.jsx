import React from "react";
import { Link } from "react-router-dom";
import person from "../assets/avatar.jpg";
const Post = ({ data }) => {
  return (
    <div
      style={{ height: "530px" }}
      className="flex flex-col gap-4 flex-wrap max-w-md md:flex-nowrap dark:bg-secondary-dark-bg p-5 rounded-2xl"
    >
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
      <div>
        <img className="rounded-2xl max-h-52" src={data.img} alt="post" />
      </div>
      <div className="flex-1">
        <h1 className="font-bold text-2xl mb-4 up">{data.title}</h1>
        <p className="up max-h-24 overflow-hidden" style={{ maxWidth: "60ch" }}>
          {data.description}
        </p>
        <button
          type="button"
          className="mt-6 bg-slate-200 text-black px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 up"
        >
          <Link state={data} to={`/post/${data.id}`}>
            Read More
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Post;

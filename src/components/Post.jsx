import React from "react";
import { Link } from "react-router-dom";

const Post = ({ data }) => {
  return (
    <div className="flex gap-4 flex-wrap md:flex-nowrap ">
      <div>
        <img
          className="rounded-2xl max-h-52 ml-auto mr-auto"
          src={data.img}
          alt="post"
        />
      </div>
      <div className="flex-1">
        <h1 className="font-bold text-4xl mb-4 up">{data.title}</h1>
        <p className="up max-h-24 overflow-hidden" style={{ maxWidth: "80ch" }}>
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

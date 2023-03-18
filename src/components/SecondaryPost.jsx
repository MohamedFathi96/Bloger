import React from "react";
import { Link } from "react-router-dom";

const SecondaryPost = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 mb-4 flex-wrap md:flex-nowrap">
      <div>
        <img
          className="rounded-2xl max-h-52 "
          src={data.img}
          alt="SecondaryPost"
        />
      </div>
      <div className="flex-1">
        <h1 className="font-bold text-lg mb-4 up">{data.title}</h1>

        <button
          type="button"
          className=" bg-slate-200 text-black px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 up"
        >
          <Link state={data} to={`/post/${data.id}`}>
            Read More
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SecondaryPost;

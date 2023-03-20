import React from "react";

const Comment = ({ data }) => {
  return (
    <div className="text-white flex gap-2 dark:bg-gray-800 p-4 rounded-3xl">
      <img
        src={data.creatorImage}
        style={{ maxWidth: "30px" }}
        className="rounded-full"
        alt="user"
      />
      <div>
        <p className="underline italic font-semibold">{data.creatorName}</p>
        <p className="indent-3">{data.comment}</p>
      </div>
    </div>
  );
};

export default Comment;

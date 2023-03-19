import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import { BiCalendarEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import SecondaryPost from "../components/SecondaryPost";
import { useDatabaseContext } from "../context/DatabaseContext";
import { Tooltip } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";

const PostDetails = () => {
  const post = useLocation().state;
  const navigate = useNavigate();
  const { database } = useDatabaseContext();
  const docRef = doc(database, "Posts", post.id);

  function deletePost() {
    deleteDoc(docRef).then(() => {
      const state = { deleteSuccess: true };
      navigate("/", { state });
    });
  }
  return (
    <div className="md:ml-56 dark:bg-main-dark-bg dark:text-white min-h-screen pb-4 px-20 flex gap-5 flex-wrap lg:flex-nowrap justify-center">
      <div className="flex flex-col gap-6 lg:basis-2/3">
        <div className="max-w-lg">
          <img className="rounded-xl" src={post.img} alt="post" />
        </div>
        <div className="flex gap-2">
          <img
            style={{ maxWidth: "40px" }}
            className="rounded-full"
            src={avatar}
            alt="person"
          />
          <div>
            <p>John</p>
            <p>Posted 2 days age</p>
          </div>
          <div className="flex gap-3 items-center">
            <Tooltip title="Edit">
              <Link state={post} to="/write">
                <BiCalendarEdit style={{ fontSize: "1.3rem" }} />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <button onClick={deletePost}>
                <AiOutlineDelete style={{ fontSize: "1.3rem" }} />
              </button>
            </Tooltip>
          </div>
        </div>
        <h1 className="font-bold text-3xl mb-5">{post.title}</h1>
        <p style={{ maxWidth: "80ch" }}>{post.description}</p>
      </div>

      <div className="basis-full lg:basis-1/3 ">
        <h2 className="capitalize font-semibold text-2xl">
          other posts you may like
        </h2>
        <div className="flex lg:flex-col mt-5 gap-4">
          <SecondaryPost data={post} />
          <SecondaryPost data={post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

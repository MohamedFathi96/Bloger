import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import person from "../assets/avatar.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import PublishIcon from "@mui/icons-material/Publish";
import Comment from "./Comment";
import { Tooltip } from "@mui/material";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useDatabaseContext } from "../context/DatabaseContext";
import { useAuthContext } from "../context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";

// /Posts/634mlLBy3KlQTN4ygtt5/Comments/fkuOuRv59PdHgIuyKmei

const Post = ({ data }) => {
  const commentModal = useRef();
  const [comments, setComments] = useState([]);
  const { database } = useDatabaseContext();
  const { currentUser } = useAuthContext();
  function addToFavorites() {
    const favoritesQuery = query(
      collection(database, "UsersInfo"),
      where("userId", "==", currentUser.uid)
    );
    getDocs(favoritesQuery).then((snapshot) => {
      const docRef = doc(database, "UsersInfo", snapshot.docs[0].id);
      updateDoc(docRef, {
        favorites: arrayUnion(data.id),
      });
    });
  }
  function showComments() {
    commentModal.current.showModal();
    const commentsCollectionRefrence = collection(
      database,
      "Posts",
      `/${data.id}/Comments`
    );
    getDocs(commentsCollectionRefrence).then((snapshot) => {
      if (snapshot.docs.length === 0) return;
      const postComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(postComments);
    });
  }
  function submitComment(event) {
    const commentsCollectionRefrence = collection(
      database,
      "Posts",
      `/${data.id}/Comments`
    );
    const comment = new FormData(event.currentTarget).get("userComment");
    addDoc(commentsCollectionRefrence, {
      comment,
      creatorId: currentUser.uid,
      creatorImage:
        currentUser.photoURL ||
        "https://firebasestorage.googleapis.com/v0/b/bloger-2e6ee.appspot.com/o/user.jpg?alt=media&token=a4beffcf-ef2a-4554-9b41-cbdd427c4294",
      creatorName: currentUser.displayName,
    });
  }

  return (
    <div className="flex flex-col basis-full gap-4 max-w-md bg-main-white-bg dark:bg-secondary-dark-bg p-5 rounded-2xl">
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
              <button onClick={addToFavorites}>
                <FavoriteIcon />
              </button>
            </Tooltip>
            <Tooltip title="Dislike">
              <button>
                <ThumbDownIcon />
              </button>
            </Tooltip>
            <Tooltip title="Like">
              <button>
                <ThumbUpIcon />
              </button>
            </Tooltip>
            <Tooltip title="Add a comment">
              <button onClick={showComments}>
                <ModeCommentIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <dialog
        style={{ width: `min(90%,70ch)` }}
        className="modal rounded-3xl dark:bg-secondary-dark-bg relative"
        ref={commentModal}
      >
        <button
          onClick={() => commentModal.current.close()}
          className="absolute right-4 top-4 text-white p-1 hover:bg-gray-500 rounded-full"
        >
          <CloseIcon style={{ fontSize: "1.3rem" }} />
        </button>
        {comments.length > 0 && (
          <div className="py-6 flex flex-col gap-3 items-start">
            {comments.map((comment) => (
              <Comment key={comment.id} data={comment} />
            ))}
          </div>
        )}

        <form onSubmit={submitComment} method="dialog">
          <Tooltip title="Submit">
            <button
              className="float-right p-2 hover:bg-gray-500 rounded-full"
              type="submit"
            >
              <PublishIcon className="text-white" />
            </button>
          </Tooltip>
          <textarea
            name="userComment"
            placeholder="Write a comment"
            className="block w-11/12 rounded-3xl p-4 outline-none text-white drop-shadow-xl placeholder:text-white dark:bg-gray-600"
          ></textarea>
        </form>
      </dialog>
    </div>
  );
};

export default Post;
// #75a2c6

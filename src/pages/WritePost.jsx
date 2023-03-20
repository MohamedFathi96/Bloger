import { addDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDatabaseContext } from "../context/DatabaseContext";
import { useAuthContext } from "../context/AuthContext";

const WritePost = () => {
  const navigate = useNavigate();
  const { database, postsRef } = useDatabaseContext();
  const { currentUser } = useAuthContext();
  const oldPost = useLocation().state;
  const descriptionRef = useRef();

  const submitPost = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!oldPost) {
      addDoc(postsRef, {
        title: data.get("title"),
        createdAt: serverTimestamp(),
        description: descriptionRef.current,
        category: data.get("category"),
        creatorId: currentUser.uid,
        creatorName: currentUser.displayName,
        creatorPhoto: currentUser.photoURL,
        img:
          data.get("image") ||
          "https://firebasestorage.googleapis.com/v0/b/bloger-2e6ee.appspot.com/o/blank.png?alt=media&token=f37123e8-a1f7-4c35-b3c0-f056f6fbad61",
      })
        .then((params) => {
          const state = {
            title: "Your post has been created",
            severity: "success",
          };
          navigate("/", { state });
        })
        .catch(() => {});
    } else {
      const docRef = doc(database, "Posts", oldPost.id);
      updateDoc(docRef, {
        title: data.get("title"),
        description: descriptionRef.current,
        createdAt: serverTimestamp(),
        category: data.get("category"),
        creatorId: currentUser.uid,
        creatorName: currentUser.displayName,
        creatorPhoto: currentUser.photoURL,
      }).then(() => {
        const state = {
          title: "Your post has been updated",
          severity: "success",
        };
        navigate("/", { state });
      });
    }
  };

  return (
    <div className="md:ml-56 min-h-screen dark:bg-main-dark-bg dark:text-white px-10 xl:px-20">
      <div className="flex flex-col lg:flex-row pt-14 gap-9">
        <form onSubmit={submitPost} id="postForm" className="basis-9/12 ">
          <input
            type="text"
            name="title"
            defaultValue={`${oldPost ? oldPost.title : ""}`}
            className="w-full p-2 outline-none rounded-lg text-black"
            placeholder="title..."
          />
          <div className="h-72 mt-4 rounded-lg overflow-scroll">
            <ReactQuill
              style={{
                backgroundColor: "white",
                color: "black",
                height: "100%",
                border: "none",
              }}
              theme="snow"
              name="description"
              placeholder="Write what you thinking....."
              defaultValue={`${oldPost ? oldPost.description : ""}`}
              onChange={(newText, delta, source, editor) =>
                (descriptionRef.current = editor.getText())
              }
            />
          </div>
        </form>
        <div className="basis-3/12 flex gap-7 lg:flex-col  items-start">
          <div className="flex flex-col gap-2 dark:bg-secondary-dark-bg px-6 py-4 rounded-3xl">
            <h2 className="text-2xl">Publish</h2>
            <p>
              <span>Status: </span>Draft
            </p>
            <p>
              <span>Visibility: </span>Public
            </p>
            <p>
              <label
                className="cursor-pointer italic underline text-blue-400"
                htmlFor="postImage"
              >
                Upload Image
              </label>
              <input
                type="file"
                className="hidden underline"
                name="image"
                id="postImage"
              />
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-4 dark:bg-secondary-dark-bg px-6 py-4 rounded-3xl">
            <h2 className="text-2xl">Category</h2>
            <div className="flex lg:flex-col gap-2">
              <div>
                <input
                  form="postForm"
                  className="mr-3 rounded-full"
                  type="radio"
                  name="category"
                  value="general"
                />
                <span>General</span>
              </div>
              <div>
                <input
                  form="postForm"
                  className="mr-3 rounded-full"
                  type="radio"
                  name="category"
                  value="financial"
                />
                <span>Financial</span>
              </div>
              <div>
                <input
                  form="postForm"
                  className="mr-3 rounded-full"
                  type="radio"
                  name="category"
                  value="food"
                />
                <span>Food</span>
              </div>
              <div>
                <input
                  form="postForm"
                  className="mr-3 rounded-full"
                  type="radio"
                  name="category"
                  value="movies"
                />
                <span>Movies</span>
              </div>
              <div>
                <input
                  form="postForm"
                  className="mr-3 rounded-full"
                  type="radio"
                  name="category"
                  value="health"
                />
                <span>Health</span>
              </div>
              <div>
                <input
                  form="postForm"
                  className="mr-3 rounded-full"
                  type="radio"
                  name="category"
                  value="technology"
                />
                <span>Technology</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="mt-6 font-semibold px-8 py-2 rounded-2xl bg-white text-black"
        type="submit"
        form="postForm"
      >
        {`${oldPost ? "Update" : "Post"}`}
      </button>
    </div>
  );
};

export default WritePost;

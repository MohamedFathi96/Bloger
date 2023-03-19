import { addDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDatabaseContext } from "../context/DatabaseContext";

const WritePost = () => {
  const navigate = useNavigate();
  const { database, postsRef } = useDatabaseContext();
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
        // img: "https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
        // img: "https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
    <div className="md:ml-56 flex pt-14 gap-9 min-h-screen dark:bg-main-dark-bg dark:text-white px-20">
      <form onSubmit={submitPost} id="postForm" className="basis-2/3 ">
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
        <button
          className="mt-12 font-semibold px-8 py-2 rounded-2xl bg-white text-black"
          type="submit"
        >
          {`${oldPost ? "Update" : "Post"}`}
        </button>
      </form>
      <div className="basis-1/3">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Publish</h2>
          <p>
            <span>Status: </span>Draft
          </p>
          <p>
            <span>Visibility: </span>Public
          </p>
          <p>
            <label className="cursor-pointer" htmlFor="postImage">
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
        <div className="flex flex-col gap-3 mt-4">
          <h2 className="text-2xl">Category</h2>
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
  );
};

export default WritePost;

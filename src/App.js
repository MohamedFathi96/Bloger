import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import PostDetails from "./pages/PostDetails";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Alert from "@mui/material/Alert";
import { AlertTitle, Fade, Tooltip } from "@mui/material";
import WritePost from "./pages/WritePost";
import UserPosts from "./pages/UserPosts";
import UserFavorites from "./pages/UserFavorites";
import MouseCanvas from "./components/MouseCanvas";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import { useEffect } from "react";

const Layout = () => {
  // const message = useLocation().state;
  const { setActiveMenu } = useAuthContext();
  return (
    <>
      <SideBar />
      <NavBar />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <PostDetails />,
      },
      {
        path: "/write",
        element: <WritePost />,
      },
      {
        path: "/:category",
        element: <Home />,
      },
      {
        path: "/user/posts",
        element: <UserPosts />,
      },
      {
        path: "/user/favorites",
        element: <UserFavorites />,
      },
    ],
  },

  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { mode, setActiveMenu, screenSize, setScreenSize } = useAuthContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`${mode}`}>
      <div className="fixed top-2 left-2 dark:text-white text-xl z-20 sm:before:content-['sm'] md:before:content-['md'] lg:before:content-['lg'] xl:b sm:before:content-['sm']efore:content-['xl'] 2xl:before:content-['2xl']"></div>
      {/* {message && (
        <Alert
          variant="filled"
          onClose={(e) => {

          }}
          sx={{
            position: "fixed",
            top: "30px",
            left: "50%",
            zIndex: 100,
            transform: "translateX(-50%)",
          }}
          severity={`${message ? message.severity : ""}`}
        >
          {message.title}
        </Alert>
      )} */}
      <MouseCanvas />
      <div
        onClick={() => setActiveMenu((prev) => !prev)}
        className="fixed bottom-2 right-2 text-white md:hidden block cursor-pointer p-2 rounded-full bg-gray-500"
      >
        <Tooltip title="Menu">
          <WidgetsIcon />
        </Tooltip>
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

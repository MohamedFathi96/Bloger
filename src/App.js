import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import PostDetails from "./pages/PostDetails";
import WritePost from "./pages/WritePost";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/Home";

const Layout = () => {
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
  const { mode } = useAuthContext();
  return (
    <div className={`${mode}`}>
      <div className="fixed top-2 left-2 dark:text-white text-xl z-20 sm:before:content-['sm'] md:before:content-['md'] lg:before:content-['lg'] xl:b sm:before:content-['sm']efore:content-['xl'] 2xl:before:content-['2xl']"></div>

      {/* <MouseCanvas /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

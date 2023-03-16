import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/Home";

function App() {
  const { mode } = useAuthContext();
  return (
    <div className={`${mode}`}>
      <BrowserRouter>
        <div className="fixed bottom-1 right-2 text-xl z-20 sm:before:content-['sm'] md:before:content-['md'] lg:before:content-['lg'] xl:b sm:before:content-['sm']efore:content-['xl'] 2xl:before:content-['2xl']"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

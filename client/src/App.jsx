import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Login from "./component/Login";
import Layout from "./Layout";
import Settings from "./component/Settings";
import Signup from "./component/Signup";
import UpdatePassword from "./component/UpdatePassword";
import { useEffect } from "react";
import useStore from "./store";
import { toast, Bounce } from "react-toastify";
import AddBlog from "./component/AddBlog";
import ShowBlog from "./component/ShowBlog";

function App() {
  const { setUser, setSpin, user, userLogin } = useStore();
  useEffect(() => {
    const checkLogin = async () => {
      const chk = await setUser();
      if (!chk) {
        toast.info("Please login to add a blog", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      setSpin(false);
    };

    checkLogin();
  }, [userLogin]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" replace />}
          />
          <Route path="/setting" element={<Settings />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/show/:showblogId" element={<ShowBlog/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

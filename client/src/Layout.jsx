import { Outlet } from "react-router-dom";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import useStore from "./store";
import { useEffect } from "react";
import Loading from "./component/Loading";
import { ToastContainer, Bounce } from "react-toastify";
export default function Layout() {
  const { user,isSpin, theme,showThemes, setShowThemes, showLog, setshowLog } = useStore();
  useEffect(() => {
    return () => {};
  }, [ theme]);

  const handleBodyClick = () => {
    // alert("body click")
    if (showLog) {
      setshowLog(0);
    }
    if(showThemes)setShowThemes(0);
  };
  return isSpin ? (
    <Loading />
  ) : (
    <div  onClick={handleBodyClick} data-theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Nav />
      <Outlet /> {/* Child routes go here */}
      <Footer />
    </div>
  );
}

import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMenu from "./pages/Admin/AdminMenu";
import { useSelector } from "react-redux";

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <ToastContainer />
      {userInfo ? (userInfo.isAdmin && <AdminMenu />) : null}
      <Navigation />
      <main className="overflow-x-hidden w-screen">
        <Outlet />
      </main>
    </>
  );
};

export default App;

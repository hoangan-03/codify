import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMenu from "./pages/Admin/AdminMenu";
import { useSelector } from "react-redux";

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className=' flex'>
      {
        userInfo && userInfo.isAdmin &&
        < div className='w-[14vw]'>
          <AdminMenu />
        </div>
      }

      <div className='w-[100vw]'>
        <ToastContainer />
        <Navigation />
        <main className="overflow-x-hidden w-full">
          <Outlet />
        </main>
      </div>
    </div >
  );
};

export default App;

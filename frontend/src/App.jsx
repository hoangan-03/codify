import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMenu from "./pages/Admin/AdminMenu";
import { useSelector } from "react-redux";

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className=' flex w-[100vw]'>
      <div className='w-[15vw]'>
        {userInfo ? (userInfo.isAdmin && <AdminMenu />) : null}
      </div>

      <div className='w-[85vw]'>
        <ToastContainer />
        <Navigation />
        <main className="overflow-x-hidden w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;

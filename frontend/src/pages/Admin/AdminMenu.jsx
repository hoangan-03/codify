import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* <button
        onClick={toggleMenu}
        className={`${isMenuOpen ? "left-60" : "left-0"} fixed top-2  z-50 bg-[#151515] p-3 `}
      >
        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
      </button> */}
      {true && (
        <div className={` ${true ? "h-[100vh]" : ""}  bg-[#151515] p-2 fixed   z-50`}>


          {(true &&
            <section className="bg-[#151515] p-4  right-7 top-5 z-50  w-[12vw]">
              <ul className="list-none mt-2">
                <li>
                  <NavLink
                    className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                    to="/admin/dashboard"
                    style={({ isActive }) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                    to="/admin/categorylist"
                    style={({ isActive }) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                  >
                    Create Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                    to="/admin/productlist"
                    style={({ isActive }) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                  >
                    Create Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                    to="/admin/allproductslist"
                    style={({ isActive }) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                  >
                    All Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                    to="/admin/userlist"
                    style={({ isActive }) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                  >
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                    to="/admin/orderlist"
                    style={({ isActive }) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                  >
                    Manage Orders
                  </NavLink>
                </li>
              </ul>
            </section>
          )}
        </div>
      )}
    </>

  );
};

export default AdminMenu;
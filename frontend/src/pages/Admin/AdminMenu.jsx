import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const colors = ["yellow", "greenyellow", "lightgreen"];
  let idx = 0;
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      idx = (idx + 1) % colors.length;
      setCurrentColor(colors[idx]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <button
        className={`top-12 right-5 w-10 aspect-square bg-gray-800 p-2 fixed rounded-lg z-50 flex justify-center items-center`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" size={20} />
        ) : (
          <div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </div>
        )}
      </button>

      <section
        className={`bg-gray-700 p-4 fixed z-45 rounded-xl top-16 right-7 transition-all duration-200 ${
          isMenuOpen
            ? "scale-100"
            : "translate-x-20 -translate-y-48 scale-0"
        }`}
      >
        <ul className="list-none mt-2">
          <li>
            <NavLink
              className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
              to="/admin/dashboard"
              style={({ isActive }) => ({
                color: isActive ? currentColor : "white",
                transition: "all 0.5s"
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
                color: isActive ? currentColor : "white",
                transition: "all 0.5s"
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
                color: isActive ? currentColor : "white",
                transition: "all 0.5s"
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
                color: isActive ? currentColor : "white",
                transition: "all 0.5s"
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
                color: isActive ? currentColor : "white",
                transition: "all 0.5s"
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
                color: isActive ? currentColor : "white",
                transition: "all 0.5s"
              })}
            >
              Manage Orders
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
};

export default AdminMenu;
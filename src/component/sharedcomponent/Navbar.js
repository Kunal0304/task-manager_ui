import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";

export default function Navbar({ name, role }) {
  const navigate = useNavigate();
  const [toggleIcon, setToggleIcon] = useState(false);
  const [notificationToggle, setNotificationToggle] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);


  const [toggleMenu, setToggleMenu] = useState(false);
  const ENDPOINT = "http://localhost:4000";
  const socket = io(ENDPOINT);

  const nameDisplay = name;
  const firstLetter = name?.charAt(0).toUpperCase();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const toggleIconFunc = () => {
    setToggleIcon((prev) => !prev);
  };

  const toggleNotificationFunc = () => {
    setNotificationToggle((prev) => !prev);
    if (!notificationToggle) {
      setUnreadCount(0);
    }
  };
  const toggleMenuFunc = () => {
    setToggleMenu((prev) => !prev);
  };

  useEffect(() => {
    socket.on("taskStatusUpdated", (data) => {
      if (role === "Admin" && data.updatedBy.role !== "Admin") {
        setNotifications((prev) => [...prev, `Task status updated: ${data.task.status} by ${data.updatedBy.name}`]);
        setUnreadCount((prev) => prev + 1);
      }
    });

    socket.on("newTaskCreated", (data) => {
      if (role !== "Admin") {
        setNotifications((prev) => [...prev, `You have been assigned a new task: ${data.task.title}`]);
        setUnreadCount((prev) => prev + 1);
      }
    });

    return () => {
      socket.off("taskStatusUpdated");
      socket.off("newTaskCreated");
    };
  }, [role]);

  return (
    <nav className="bg-slate-700">
      <div className=" max-w-8xl ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={toggleMenu ? "true" : "false"}
              onClick={toggleMenuFunc}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className={`block size-6 ${toggleMenu ? "hidden" : "block"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`block size-6 ${toggleMenu ? "block" : "hidden"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {role === "Admin" && (
                  <NavLink
                    to="/task"
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-lg font-medium ${isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                    aria-current="page"
                  >
                    Task
                  </NavLink>
                )}
                {role === "Admin" && (
                  <NavLink
                    to="/user"
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-lg font-medium ${isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    User List
                  </NavLink>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={toggleNotificationFunc}
            >
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {unreadCount}
                </span>
              )}
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </button>
            {notificationToggle && (
              <div
                className="absolute top-0 right-5 z-10 mt-14 w-64 origin-top-right rounded-md bg-slate-100 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none overflow-y-auto max-h-64"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <div className="flex items-center px-2 py-0">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#D1D5DB",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      fontSize: "18px",
                    }}
                  >
                    {firstLetter}
                  </div>
                  <div
                    className="px-4 py-2 text-lg text-gray-700"
                    style={{ textAlign: "left" }}
                  >
                    <strong>{nameDisplay}</strong>
                  </div>
                </div>
                <div className="flex flex-direction items-center px-2 py-0">
                  <ul>
                    {notifications.length ? notifications.map((notification, index) => (
                      <>
                      <li key={index} className="p-2 border-b border-gray-200">
                        {notification}
                      </li>
                      {notifications.length - 1 !== index && <hr />}
                      </>
                    )): <li className="p-2 border-b border-gray-200">No notifications</li>}
                  </ul>
                </div>
              </div>
            )}
            <div className="relative ml-3 pr-5">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={toggleIconFunc}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#D1D5DB",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      fontSize: "18px",
                    }}
                  >
                    {firstLetter}
                  </div>
                </button>
              </div>
              {toggleIcon && (
                <div
                  className="absolute right-5 z-10 mt-2 w-40 origin-top-right rounded-md bg-slate-100 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <div className="flex items-center px-2 py-0">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#D1D5DB",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        fontSize: "18px",
                      }}
                    >
                      {firstLetter}
                    </div>
                    <div
                      className="px-4 py-2 text-lg text-gray-700"
                      style={{ textAlign: "left" }}
                    >
                      <strong>{nameDisplay}</strong>
                    </div>
                  </div>
                  <hr />
                  <a
                    href
                    className="block px-4 py-2 text-sm text-red-400 font-bold"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    onClick={handleSignOut}
                    style={{ cursor: "pointer" }}
                  >
                    Log out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`sm:hidden ${toggleMenu ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          {role === "Admin" && (
            <NavLink
              to="/task"
              className={({ isActive }) =>
                `block rounded-md   px-3 py-2 text-base font-medium ${isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Task
            </NavLink>
          )}
          {role === "Admin" && (
            <NavLink
              to="/user"
              className={({ isActive }) =>
                `block rounded-md  px-3 py-2  text-base font-medium ${isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              User List
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

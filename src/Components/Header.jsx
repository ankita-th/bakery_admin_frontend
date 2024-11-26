import React, { useEffect, useRef, useState } from "react";
import { BellIcon } from "../assets/Icons/Svg";
import userImage from "../assets/images/Avatar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getHeadingTitleFromRoute } from "../utils/helpers";
import { makeApiRequest } from "../api/apiFunctions";
import { successType, toastMessage } from "../utils/toastMessage";

const Header = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const userName = localStorage.getItem("userName");
  const { pathname } = useLocation();
  const title = getHeadingTitleFromRoute(pathname);
  // State to track dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleLogout = () => {
    // make api call here
    // makeApiRequest({
    //   endPoint:LOGOUT_ENDPOINT
    // })
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <header className="header flex py-4 px-4 sm:px-10 font-[sans-serif] min-h-[70px] tracking-wide relative z-50 sticky top-0">
        <div className="flex flex-wrap items-center justify-between gap-5 w-full">
          <div class="main_head_title">
            {pathname === "/dashboard" || pathname === "/" ? (
              <h5 class="text-lg font-normal">
                {/* Good Morning{" "} */}
                Welcome
                <span class="text-[#EC7F1A] font-bold text-xl ml-2">
                  {userName}
                </span>
              </h5>
            ) : (
              <h2 class="text-lg ">{title}</h2>
            )}
          </div>

          <div className="flex max-lg:ml-auto space-x-3">
            <button class="relative p-2 rounded-full rounded-full">
              {BellIcon}
            </button>
            <div className="relative inline-block text-left">
              {/* Profile Button with Image and Name */}
              <button
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={toggleDropdown}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={userImage} />
                  </div>
                  <span className="font-semibold text-gray-700">
                    {userName}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div
                  id="dropdownMenu"
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </a>
                  <span
                    onClick={() => {
                      navigate("/settings");
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Settings
                  </span>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button id="toggleOpen" className="lg:hidden">
              <svg
                className="w-7 h-7"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

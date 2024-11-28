import React, { useReducer, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ConfigurationIcon,
  DashboardIcon,
  DiscountIcon,
  EmployeeIcon,
  InventoryIcon,
  OrdersIcon,
  PaymentIcon,
  ProductsIcon,
  RawMaterialsIcon,
  RecipeIcon,
  TodoIcon,
  SupportIcon,
  SettingsIcon,
  NotificationIcon,
  leftCaret,
} from "../assets/Icons/Svg";
import userImage from "../assets/images/Avatar.png";

const SIDEBAR_LINKS_TOP = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    href: "/dashboard",
    activeRoutes: ["/dashboard"],
  },
  {
    label: "Products",
    icon: ProductsIcon,
    href: "/products",
    activeRoutes: ["/products", "/add-edit-product"],
  },
  {
    label: "Raw Materials",
    icon: RawMaterialsIcon,
    href: "/raw-materials",
    activeRoutes: ["/raw-materials"],
  },
  {
    label: "Orders",
    icon: OrdersIcon,
    href: "/orders-management",
    activeRoutes: ["/orders-management"],
  },
  {
    label: "Inventory",
    icon: InventoryIcon,
    href: "/inventory",
    activeRoutes: ["/inventory"],
  },
  {
    label: "Discounts & Promotions",
    icon: DiscountIcon,
    href: "/discounts",
    activeRoutes: ["/discounts"],
  },
  {
    label: "Employee",
    icon: EmployeeIcon,
    href: "/employee",
    activeRoutes: ["/employee"],
  },
  {
    label: "Customers",
    icon: DashboardIcon,
    href: "/customers",
    activeRoutes: ["/customers"],
  },
  {
    label: "Todo",
    icon: TodoIcon,
    href: "/to-do",
    activeRoutes: ["/to-do"],
  },
  {
    label: "Configuration",
    icon: ConfigurationIcon,
    href: "/configuration",
    activeRoutes: ["/configuration"],
  },
  {
    label: "Recipe's",
    icon: RecipeIcon,
    href: "/recipe",
    activeRoutes: ["/recipe", "/add-edit-recipe"],
  },
  {
    label: "Payment History",
    icon: PaymentIcon,
    href: "/payment-history",
    activeRoutes: ["/payment-history"],
  },
];
const SIDEBAR_LINKS_BOTTOM = [
  {
    label: "Support",
    icon: SupportIcon,
    href: "/support",
  },
  {
    label: "Notifications",
    icon: NotificationIcon,
    href: "/notifications",
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    href: "/settings",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const userName = localStorage.getItem("userName");
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <nav className="sidebar w-20 bg-white shadow-lg h-screen fixed top-0 left-0 min-w-[280px] py-3 px-3 font-[sans-serif] overflow-auto">
        <Link href="/dashboard" className="nav-item">
          LOGO
        </Link>
        <ul className="custom_nagivation">
          {SIDEBAR_LINKS_TOP?.map(
            ({ label, href, icon, activeRoutes }, idx) => (
              <li>
                <NavLink
                  key={idx}
                  to={href}
                  className={`nav-item ${
                    activeRoutes.includes(pathname) && "active-link"
                  }`}
                >
                  <div className="nav-item">
                    <div className="icon">{icon}</div>
                    {label}
                  </div>
                </NavLink>
              </li>
            )
          )}
          <div className="horizontal-line w-full h-px bg-gray-300 my-4"></div>
          {SIDEBAR_LINKS_BOTTOM?.map(({ label, href, icon }, idx) => (
            <li>
              <NavLink
                key={idx}
                to={href}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active-link" : ""}`
                }
              >
                <div className="nav-item">
                  <div className="icon">{icon}</div>
                  {label}
                </div>
              </NavLink>
            </li>
          ))}
          <div className="relative block text-left">
            {/* Profile Button with Image and Name */}
            <button
              className="flex items-center w-full space-x-2 justify-between p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={toggleDropdown}
            >
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={userImage} />
                </div>
                {/* <span></span> */}
                <div className="text-left">
                  <h4 className="text-[12px] text-[#64748B]">
                    Welcome back 👋
                  </h4>
                  <span className="font-semibold text-gray-700">
                    {userName}
                  </span>
                </div>
              </div>
              <span>{leftCaret}</span>
            </button>

            {isOpen && (
              <div
                id="dropdownMenu"
                ref={dropdownRef}
                className="absolute left-0 bottom-[70px] mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
              >
                {/* <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </a> */}
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
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;

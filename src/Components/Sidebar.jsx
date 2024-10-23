import React from "react";
import { Link, NavLink } from "react-router-dom";
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
} from "../assets/Icons/Svg";

const SIDEBAR_LINKS_TOP = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    href: "/dashboard",
  },
  {
    label: "Products",
    icon: ProductsIcon,
    href: "/products",
  },
  {
    label: "Raw Materials",
    icon: RawMaterialsIcon,
    href: "/raw-materials",
  },
  {
    label: "Orders",
    icon: OrdersIcon,
    href: "/orders",
  },
  {
    label: "Inventory",
    icon: InventoryIcon,
    href: "/inventory",
  },
  {
    label: "Discounts & Promotions",
    icon: DiscountIcon,
    href: "/discounts",
  },
  {
    label: "Employee",
    icon: EmployeeIcon,
    href: "/employee",
  },
  {
    label: "Customers",
    icon: DashboardIcon,
    href: "/customers",
  },
  {
    label: "Todo",
    icon: TodoIcon,
    href: "/todo",
  },
  {
    label: "Configuration",
    icon: ConfigurationIcon,
    href: "/configuration",
  },
  {
    label: "Recipes",
    icon: RecipeIcon,
    href: "/recipes",
  },
  {
    label: "Payment History",
    icon: PaymentIcon,
    href: "/payment-history",
  },
];
const SIDEBAR_LINKS_BOTTOM = [
  {
    label: "Support",
    icon: DashboardIcon,
    href: "/support",
  },
  {
    label: "Notifications",
    icon: DashboardIcon,
    href: "/notifications",
  },
  {
    label: "Settings",
    icon: DashboardIcon,
    href: "/settings",
  },
];

const Sidebar = () => {
  return (
    <>
      <nav className="sidebar w-20 bg-white shadow-lg h-screen fixed top-0 left-0 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto">
        <ul>
          <li>
            <Link href="/dashboard" className="nav-item">
              LOGO
            </Link>
          </li>
          {SIDEBAR_LINKS_TOP?.map(({ label, href, icon }, idx) => (
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
          ))}
          <div className="horizontal-line w-full h-px bg-gray-300 my-4"></div>
          {SIDEBAR_LINKS_BOTTOM?.map(({ label, href, icon }, idx) => (
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
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;

import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
} from "../assets/Icons/Svg";

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
    href: "/orders",
    activeRoutes: ["/orders"],
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
    activeRoutes: ["/recipe", "add-edit-recipe"],
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
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;

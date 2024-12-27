import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import AddEditProduct from "../pages/AddEditProduct";
import Categories from "../pages/Categories";
import RawMaterials from "../pages/RawMaterials";
import Todo from "../pages/Todo";
import ZipConfiguration from "../pages/ZipConfiguration";
import RecipeAddEdit from "../pages/RecipeAddEdit";
import Recipe from "../pages/Recipe"
import InventoryManagement from "../pages/InventoryManagement";
import EmployeeManagement from "../pages/EmployeeManagement";
import PaymentHistory from "../pages/PaymentHistory";
import Discounts from "../pages/Discounts";
import AddEditDiscount from "../pages/AddEditDiscount";
import Customers from "../pages/Customers";
import Support from "../pages/Support";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import ForgetPassword from "../pages/ForgetPassword";
import OrdersHistory from "../Components/OrderHistory";
import OrderManagement from "../Components/OrderManagement";
import { ROLES } from "../constant";

export const routes = [
  {
    path: "/",
    element: <Dashboard />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/products",
    element: <Products />,
    private: true,
    roles: [ROLES?.admin, ROLES?.stockManager],
  },
  {
    path: "/login",
    element: <Login />,
    public: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/add-edit-product",
    element: <AddEditProduct />,
    private: true,
    roles: [ROLES?.admin, ROLES?.stockManager],
  },
  {
    path: "/view-product",
    element: <AddEditProduct />,
    private: true,
    roles: [ROLES?.admin, ROLES?.stockManager],
  },
  {
    path: "/categories",
    element: <Categories />,
    private: true,
    roles: [ROLES?.admin],
  },

  {
    path: "/raw-materials",
    element: <RawMaterials />,
    private: true,
    roles: [ROLES?.admin, ROLES?.stockManager],
  },
  {
    path: "/to-do",
    element: <Todo />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/recipe",
    element: <Recipe />,
    private: true,
    roles: [ROLES?.admin, ROLES?.stockManager],
  },
  {
    path: "/configuration",
    element: <ZipConfiguration />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/add-edit-recipe",
    element: <RecipeAddEdit />,
    private: true,
    roles: [ROLES?.admin, ROLES?.stockManager],
  },
  {
    path: "/add-edit-recipe/:receipe_id",
    element: <RecipeAddEdit />,
    private: true,
    roles: [ROLES?.admin, ROLES?.stockManager],
  },
  {
    path: "/inventory/",
    element: <InventoryManagement />,
    private: true,
    roles: [ROLES?.admin, ROLES?.stockManager],
  },
  {
    path: "/employee/",
    element: <EmployeeManagement />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/payment-history/",
    element: <PaymentHistory />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/payment-history/",
    element: <PaymentHistory />,
    private: true,
    roles: [ROLES?.admin, ROLES?.accountManager],
  },
  {
    path: "/customers",
    element: <Customers />,
    private: true,
    roles: [ROLES?.admin],
  },

  {
    path: "/support",
    element: <Support />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/notifications",
    element: <Notifications />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/*",
    element: <NotFound />,
    roles: [ROLES?.admin],
  },
  {
    path: "/discounts/",
    element: <Discounts />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/add-edit-discount/",
    element: <AddEditDiscount />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/settings",
    element: <Settings />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/support",
    element: <Support />,
    private: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
    public: true,
    roles: [ROLES?.admin],
  },
  {
    path: "/orders-history",
    element: <OrdersHistory />,
    private: true,
    roles: [ROLES?.admin, ROLES?.accountManager],
  },
  {
    path: "/orders-management",
    element: <OrderManagement />,
    private: true,
    roles: [ROLES?.admin,ROLES?.accountManager],
  },
];

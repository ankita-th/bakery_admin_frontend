import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import AddEditProduct from "../pages/AddEditProduct";
import Categories from "../pages/Categories";
import RawMaterials from "../pages/RawMaterials";
import Todo from "../pages/Todo";
import ZipConfiguration from "../pages/ZipConfiguration";
import Recipe from "../pages/Recipe";
import RecipeAddEdit from "../pages/RecipeAddEdit";
import InventoryManagement from "../pages/InventoryManagement";
import EmployeeManagement from "../pages/EmployeeManagement";
import PaymentHistory from "../pages/PaymentHistory";
import Customers from "../pages/Customers";
import Support from "../pages/Support";
import Notifications from "../pages/Notifications";

export const routes = [
  {
    path: "/",
    element: <Dashboard />,
    private: true,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    private: true,
  },
  {
    path: "/products",
    element: <Products />,
    private: true,
  },
  {
    path: "/login",
    element: <Login />,
    public: true,
  },
  {
    path: "/add-edit-product",
    element: <AddEditProduct />,
    private: true,
  },
  {
    path: "/categories",
    element: <Categories />,
    private: true,
  },

  {
    path: "/raw-materials",
    element: <RawMaterials />,
    private: true,
  },
  {
    path: "/to-do",
    element: <Todo />,
    private: true,
  },
  {
    path: "/recipe",
    element: <Recipe />,
    private: true,
  },
  {
    path: "/configuration",
    element: <ZipConfiguration />,
    private: true,
  },
  {
    path: "/add-edit-recipe",
    element: <RecipeAddEdit />,
    private: true,
  },
  {
    path: "/add-edit-recipe/:receipe_id",
    element: <RecipeAddEdit />,
    private: true,
  },
  {
    path: "/inventory/",
    element: <InventoryManagement />,
    private: true,
  },
  {
    path: "/employee/",
    element: <EmployeeManagement />,
    private: true,
  },
  {
    path: "/payment-history/",
    element: <PaymentHistory />,
    private: true,
  },
  {
    path: "/customers",
    element: <Customers />,
    private: true,
  },
  {
    path: "/support",
    element: <Support />,
    private: true,
  },
  {
    path: "/notifications",
    element: <Notifications />,
    private: true,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];

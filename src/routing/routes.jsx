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
    path: "/*",
    element: <NotFound />,
  },
];

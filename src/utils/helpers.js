const routeTitles = {
  "/dashboard": "Welcome John Doe",
  "/products": "Products",
  "/add-new-product": "New Product",
  "/categories": "Categories",
};

export const getHeadingTitleFromRoute = (pathName) => {
  return routeTitles?.[pathName] || "";
};

export const cleanFilters = (filters) => {
  return Object.keys(filters).reduce((acc, key) => {
    if (filters[key]) {
      acc[key] = encodeURIComponent(filters[key]); // Encode the value
    }
    return acc;
  }, {});
};

export const renderSerialNumber = (currentPage, itemsPerPage, index) => {
  return (currentPage - 1) * itemsPerPage + index + 1;
};

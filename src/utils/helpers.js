const routeTitles = {
  "/dashboard": "Welcome John Doe",
  "/products": "Products",
  "/add-new-product": "New Product",
  "/categories": "Categories",
  "/raw-materials": "Raw Materials",
};

export const getHeadingTitleFromRoute = (pathName) => {
  return routeTitles?.[pathName] || "";
};

// for removing empty filters and encoding them
export const cleanFilters = (filters) => {
  return Object.keys(filters).reduce((acc, key) => {
    if (filters[key]) {
      acc[key] = encodeURIComponent(filters[key]); // Encode the value
    }
    return acc;
  }, {});
};

// to render S.No for tables
export const renderSerialNumber = (currentPage, itemsPerPage, index) => {
  return (currentPage - 1) * itemsPerPage + index + 1;
};

// will be used to delete a particular item from an array of object  based on id

export const deleteItemBasedOnId = (arr, id) => {
  if (arr?.length) {
    return arr.filter((el) => el.id !== id);
  }
};

// to check whether the uploaded image is of valid type of not

export const isValidType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

export const prefillFormValues = (data, prefillkeys, setValue) => {
  prefillkeys?.forEach((key) => {
    if (data?.[key]) {
      setValue(key, data[key]);
    }
  });
};

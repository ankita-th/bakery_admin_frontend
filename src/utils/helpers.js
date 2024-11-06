import moment from "moment";

const routeTitles = {
  "/dashboard": "Welcome John Doe",
  "/products": "Products",
  "/add-new-product": "New Product",
  "/categories": "Categories",
  "/raw-materials": "Raw Materials",
  "/configuration": "ZIP Code Configuration",
  "/recipe": "Recipe",
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

export const employeeListIntoOptions = (employeeList) => {
  let result = [];
  employeeList.forEach(({ first_name, last_name, id }) => {
    const option = { label: `${first_name} ${last_name}`, value: id };
    result.push(option);
  });
  return result;
};

export const extractOption = (options, valueToExtract, key) => {
  if (options?.length && valueToExtract) {
    const elem = options?.find((curElem) => curElem?.[key] == valueToExtract);
    console.log(elem, "log element inside extract option");
    return elem;
  }
};

export const formatDate = (date, format) => {
  if (date && format) {
    return moment(date).format(format);
  }
};
export const returnAddressInfo = (addressComponents) => {
  if (addressComponents) {
    console.log(addressComponents, "addressComponents");
    const countryObj = addressComponents?.find((component) =>
      component.types.includes("country")
    );

    const stateObj = addressComponents?.find((component) =>
      component.types.includes("administrative_area_level_1")
    );

    const cityObj = addressComponents?.find(
      (component) =>
        component.types.includes("locality") ||
        component.types.includes("sublocality") ||
        component.types.includes("administrative_area_level_2") ||
        component.types.includes("route")
    );
    const city = cityObj?.long_name;

    return {
      country: countryObj?.short_name || null,
      state: stateObj?.short_name || null,
      city: cityObj?.long_name || null,
    };
  }
};

export const handleEdit = (arr, id, dataToUpdate) => {
  if (arr.length) {
    const temp = [...arr];
    const index = temp.findIndex((el) => el.id == id);
    if (index !== -1) {
      const item = { ...temp[index], ...dataToUpdate };
      temp[index] = item;
    }
    return temp;
  }

  // return arr.map((el) =>
  //   el.id === id ? { ...el, ...dataToUpdate } : el
  // );
};

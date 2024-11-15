import moment from "moment";

const routeTitles = {
  "/dashboard": "Welcome John Doe",
  "/products": "Products",
  "/add-new-product": "New Product",
  "/categories": "Categories",
  "/raw-materials": "Raw Materials",
  "/configuration": "ZIP Code Configuration",
  "/recipe": "Recipe",
  "/add-edit-recipe": "New Recipe",
  "/inventory": "Inventory Management",
  "/employee": "Employee Management",
  "/payment-history": "Payment History",
  "/to-do": "To-Do List",
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

export const appendStepCountInObject = (instructions) => {
  if (instructions?.length) {
    const result = [];
    instructions.forEach((curElem, index) => {
      const item = { ...curElem, step_count: index + 1 };
      result.push(item);
    });
    return result;
  }
};

export const createRequiredValidation = (fieldName) => {
  const field = fieldName || "This field";
  return { required: `${field} is required` };
};

export const createProductSeo = (values) => {
  const { focused_keyword, seo_title, slug, preview_as, meta_description } =
    values;
  const result = {
    seo_title: seo_title,
    slug: slug,
    meta_description: meta_description,
    focused_keyword: extractSelectOptions(focused_keyword, "value"),
    preview_as: preview_as,
  };
  return result;
};

export const createInventoryPayload = (values) => {
  const { sku, regular_price, sale_price, weight, unit, bulking_price_rules } =
    values;
  const result = {
    sku: sku,
    regular_price: regular_price,
    sale_price: sale_price,
    weight: weight,
    unit: unit?.value,
    bulking_price_rules: bulking_price_rules,
  };
  return result;
};

export const extractSelectOptions = (options, valueToExtract) => {
  if (options.length) {
    const result = [];
    options.forEach((curElem) => {
      if (curElem?.[valueToExtract]) {
        result.push(curElem[valueToExtract]);
      }
    });
    return result;
  }
};

export const createAdvancedPayload = (values) => {
  return {
    minimum_order_quantity: values?.minimum_order_quantity,
    purchase_note: values?.purchase_note,
  };
};

export const createFilesObject = (files) => {
  const result = {};
  files.forEach(({ file }) => {
    if (file) {
      result["category_images"] = file;
    }
  });
};

export const isFilesNotEmpty = (files) => {
  return files.some(({ file }) => file);
};

export const handleRawMaterialErrorToast = (err) => {
  if (err?.response?.data?.name?.[0]) {
    return err?.response?.data?.name?.[0];
  } else if (err?.response?.data?.slug?.[0]) {
    return err?.response?.data?.slug?.[0];
  } else {
    return DEFAULT_ERROR_MESSAGE;
  }
};

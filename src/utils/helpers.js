import moment from "moment";
import {
  BACKDOOR_OPTIONS,
  MEASURE_OPTIONS,
  RECIPE_MEASURE_OPTIONS,
} from "../constant";
import { T } from "./languageTranslator";
const base_url = import.meta.env.VITE_APP_BASE_URL;
const userName = localStorage?.getItem("userName");
const routeTitles = {
  "/dashboard": `Welcome ${userName}`,
  "/products": T["products"],
  "/add-new-product": T["new_product"],
  "/categories": T["categories"],
  "/raw-materials": T["raw_materials"],
  "/configuration": T["zip_code_configuration"],
  "/recipe": T["recipe"],
  "/add-edit-recipe": T["new_recipe"],
  "/inventory": T["inventory_management"],
  "/employee": T["employee_management"],
  "/payment-history": T["payment_history"],
  "/to-do": T["to_do_list"],
  "/add-edit-product": T["new_product"],
  "/discounts": T["discounts_promotions_management"],
  "/customers": T["customers_management"],
  "/support": T["customers_support_management"],
  "/notifications": T["notifications_and_alerts"],
  "/settings": T["settings"],
  "/orders-management": T["order_management"],
  "/orders-history": T["order_history"],
  "/view-product": T["view_product"],
};

export const getHeadingTitleFromRoute = (pathName) => {
  if (localStorage?.getItem("isRecipeEdit")) {
    return "Edit Recipe";
  }
  return routeTitles?.[pathName] || "";
};

// for removing empty filters and encoding them
export const cleanFilters = (filters) => {
  return Object.keys(filters).reduce((acc, key) => {
    if (filters[key]) {
      // acc[key] = encodeURIComponent(filters[key]); // Encode the value
      acc[key] = filters[key];
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
  if (employeeList?.length) {
    employeeList?.forEach(({ first_name, last_name, id, email }) => {
      const option = {
        label: `${first_name} ${last_name} (${email})`,
        value: id,
      };
      result.push(option);
    });
  }
  return result;
};

export const extractOption = (options, valueToExtract, key) => {
  if (options?.length && valueToExtract) {
    const elem = options?.find((curElem) => curElem?.[key] == valueToExtract);
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

export const createRequiredValidation = (fieldName, customMessage) => {
  if (customMessage) {
    // if custom message is true then inside fieldname custom message will be passed
    return { required: customMessage };
  } else {
    const field = fieldName || "This field";
    return { required: `${field} is required` };
  }
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
  const {
    sku,
    regular_price,
    sale_price,
    weight,
    unit,
    bulking_price_rules,
    sale_price_dates_from,
    sale_price_dates_to,
  } = values;
  const result = {
    sku: sku,
    regular_price: regular_price,
    sale_price: sale_price,
    weight: weight,
    unit: unit?.value,
    bulking_price_rules: bulking_price_rules,
    sale_price_dates_from: sale_price_dates_from,
    sale_price_dates_to: sale_price_dates_to,
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

export const createVariantPayload = (values) => {
  if (values?.variants?.length) {
    const temp = [...values.variants];
    const result = [];
    temp.forEach((curElem) => {
      const item = {
        ...curElem,
        allow_backorders: curElem?.allow_backorders.value,
        unit: curElem?.unit?.value,
        quantity: +curElem?.quantity,
      };
      result.push(item);
    });
    return result;
  }
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

export const convertIntoSelectOptions = (options, labelKey, valueKey) => {
  const result = [];
  options.forEach((curElem) => {
    const option = {
      label: curElem?.[labelKey],
      value: curElem?.[valueKey],
    };
    result.push(option);
  });
  return result;
};

export const createPreview = (imagePreview) => {
  const newPreview = imagePreview.substring(1);
  return `${base_url}${newPreview}`;
};

export const listCategories = (categories) => {
  if (categories?.length) {
    const categoryNames = categories.map(({ name, ...rest }) => name);
    return categoryNames.join(", ");
  }
};

export const handleCategory = (categories) => {
  console.log(categories);
  if (categories?.length) {
    const result = categories?.map(({ id }) => String(id));
    return result;
  }
};

export const generateRandomCode = (length = 5) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};
// extract from is for label or value
export const convertSelectOptionToValue = (option, extractFrom = "value") => {
  return option[extractFrom];
};
export const combineBarcode = (from, to) => {
  return `${from}-${to}`;
};

export const convertValuesIntoLabelAndValue = (data) => {
  if (data?.length) {
    const result = [];
    data.forEach((curElem) => {
      const item = { label: curElem, value: curElem };
      result.push(item);
    });
    return result;
  }
};

export const createName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};
export const createSlugValidation = () => {
  return {
    required: "Slug is required",
    // pattern: {
    //     value: /^[a-zA-Z0-9_-]+$/,
    //     message: "Only numbers, alphabets, underscores, and hyphens are allowed",
    // },
  };
};
export const createIngredientPayload = (ingredients) => {
  if (ingredients?.length) {
    const result = [];
    ingredients.forEach((ingredient) => {
      const item = {
        ...ingredient,
        unit_of_measure: ingredient?.unit_of_measure?.value,
      };
      result.push(item);
    });
    return result;
  }
};

export const handleIngredients = (ingredients) => {
  if (ingredients?.length) {
    const result = [];
    ingredients.forEach((ingredient) => {
      const extractedOption = extractOption(
        RECIPE_MEASURE_OPTIONS,
        ingredient?.unit_of_measure,
        "value"
      );
      const item = { ...ingredient, unit_of_measure: extractedOption };
      result.push(item);
    });
    return result;
  }
};
export const getHeadingTitleFromState = (state) => {
  if (state === "amount_off_product") {
    return "Amount Off Products";
  } else if (state === "buy_x_get_y") {
    return "Buy X Get Y";
  } else if (state === "amount_off_order") {
    return "Amount Off Order";
  } else {
    return "Free Shipping";
  }
};

export const createVariantsData = (variants) => {
  console.log(variants, "these are variants");
  const result = [];
  if (variants?.length) {
    variants.forEach((curElem) => {
      const item = {};
      const directKeys = [
        "allow_backorders",
        "description",
        "enabled",
        "managed_stock",
        "name",
        "sku",
      ];
      const inventoryKeys = [
        "regular_price",
        "sale_price",
        "sale_price_dates_from",
        "sale_price_dates_to",
        "sku",
        "weight",
        "bulking_price_rules",
        "total_quantity",
        "unit",
      ];
      directKeys.map((key) => {
        if (key === "description") {
          item[key] = extractTextFromParagraph(curElem[key]);
        } else if (key === "allow_backorders") {
          const extractedOption = extractOption(
            BACKDOOR_OPTIONS,
            "allow",
            "value"
          );
          item[key] = extractedOption;
        } else {
          item[key] = curElem[key];
        }
      });
      inventoryKeys.map((key) => {
        if (key === "total_quantity") {
          item["quantity"] = curElem?.inventory?.[key];
        } else if (key === "unit") {
          const extractedOption = extractOption(
            MEASURE_OPTIONS,
            curElem?.inventory?.[key],
            "value"
          );
          item[key] = extractedOption;
        } else {
          item[key] = curElem?.inventory?.[key];
        }
      });
      result.push(item);
    });
  }
  console.log(result, "result");
  return result;
};

export function extractTextFromParagraph(htmlString) {
  const match = htmlString.match(/<p>(.*?)<\/p>/);
  return match ? match[1] : "";
}

export const convertArrayToString = (array) => {
  if (array?.length) {
    return array.join(", ");
  }
};

export const formatTime = (inputTime) => {
  return moment(inputTime, "HH:mm").format("h:mm a");
};

export const COMBINATION_TO_VALUE = {
  order_discounts: "Order discounts",
  product_discounts: "Product discounts",
  shipping_discounts: "Shipping discounts",
};
export const showCombination = (combination) => {
  const formattedCombinations = combination.map((item) => {
    return COMBINATION_TO_VALUE[item];
  });
  return convertArrayToString(formattedCombinations);
};

//  for payload
export const convertProductsIntoPairs = (products) => {
  const result = [];
  products?.forEach((el) => {
    const item = { name: el?.label, id: el?.value };
    result?.push(item);
  });
  return result;
};
// for useEffect
export const convertPairFromProducts = (products) => {
  const result = [];
  products?.forEach((el) => {
    const item = { label: el?.name, value: el?.id };
    result?.push(item);
  });
  return result;
};

export const actionToText = {
  draft: "drafted",
  duplicate: "duplicated",
  delete: "deleted",
};
export const handleBulkMessage = (field) => {
  return `Please select at least one ${field} before performing any action`;
};
// for calculating complete length of categories and subcategories
export const completeLength = (categories) => {
  let tempCategories = [];
  let tempSubCategories = [];

  categories?.forEach((elem) => {
    tempCategories?.push(elem?.id);
    elem?.subcategories?.map((subcat) => {
      tempSubCategories?.push(subcat?.id);
    });
  });
  return tempCategories?.length + tempSubCategories?.length;
};

export function downloadPDF(responseData, fileName = "document.pdf") {
  // Convert the API response to a Blob object
  const blob = new Blob([responseData], { type: "application/pdf" });

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;

  // Trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
}

export function handlePrint(responseData) {
  // Convert the API response to a Blob object
  const blob = new Blob([responseData], { type: "application/pdf" });

  // Create a temporary URL for the Blob
  const pdfUrl = window.URL.createObjectURL(blob);

  // Open the URL in a new tab or window
  const printWindow = window.open(pdfUrl);

  // Wait for the PDF to load, then trigger print
  printWindow.onload = () => {
    printWindow.print();
  };
}

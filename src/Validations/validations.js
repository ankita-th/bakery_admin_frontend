// validations for category section

export const CategoryValidations = {
  name: {
    required: "Name is required",
  },
  slug: {
    required: "Slug is required",
  },
  description: {
    required: "Description is required",
  },
  // need to be changed according to the api
  parent_category: {
    required: "Parent category is required",
  },
};

// validations for raw material section

export const RawMaterialValidations = {
  name: {
    required: "Material name is required",
  },
  quantity: {
    required: "Quantity is required",
  },
  cost: {
    required: "Cost per unit is required",
  },
  unit_of_measure: {
    required: "Unit of measure is required",
  },
};

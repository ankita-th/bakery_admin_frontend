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
  expiry_date: {
    required: "Expiry date is required",
  },
};

// validations for todo

export const TodoValidations = {
  task_id: {
    required: "Task ID is required",
  },
  title: {
    required: "Task name is required",
  },
  description: {
    required: "Description is required",
  },
  start_date: {
    required: "Start Date is required",
  },
  assigned_to: {
    required: "This field is required",
  },
};

export const ConfigurationValidations = {
  zip_code: {
    required: "ZIP code is required",
  },
  delivery_availability: {
    required: "Delivery availablity is required",
  },
  address: {
    required: "Address is required",
  },
  delivery_threshold: {
    required: "Delivery threshold is required",
    min: {
      value: 1,
      message: "Delivery threshold must be greater than 1",
    },
    max: {
      value: 999999,
      message: "Delivery threshold must be less than 999999",
    },
  },
  min_order_quantity: {
    required: "Min order quantity is required",
    min: {
      value: 1,
      message: "Minimum order quantity must be greater than 1",
    },
    max: {
      value: 999999,
      message: "Minimum order quantity must be less than 999999",
    },
  },
  state: {
    required: "State is required",
  },
  
  city: {
    required: "City is required",
  },
};

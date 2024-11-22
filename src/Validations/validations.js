// regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// regex

// validations for category section

export const CategoryValidations = {
  name: {
    required: "Title is required",
  },
  slug: {
    required: "Slug is required",
  },
  description: {
    // required: "Description is required",
  },
  // need to be changed according to the api
  parent_category: {
    // required: "Parent category is required",
  },
};

// validations for raw material section

export const RawMaterialValidations = {
  name: {
    required: "Material name is required",
  },
  quantity: {
    required: "Quantity is required",
    max:{
      value:2147483647,
      message:"Quantity value must be less than or equal to 2147483647"
    }
  },
  cost: {
    required: "Cost per unit is required",
    maxLength:{
      value:10,
      message:"Value must not be more than 10 digits in total"
    }
  },
  unit_of_measure: {
    required: "Unit of measure is required",
  },
  expiry_date: {
    required: "Expiry date is required",
  },
  reorder:{
    max:{
      value:2147483647,
      message:"Reorder value must be less than or equal to 2147483647"
    }
  }
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

// Recipe validations
export const RecipeValidations = {
  recipe_title: {
    required: "Recipe title is required",
  },
  preparation_time: {
    required: "Preparation time is required",
    max:{
      value:300,
      message:"Preparation time value must be less than or equal to 300 minutes."
    }
  },
  cook_time: {
    required: "Cook time is required",
    max:{
      value:600,
      message:"Cook time value must be less than or equal to 600 minutes."
    }
  },
  difficulty_level: {
    required: "Difficulty level is required",
  },
  difficulty_level: {
    required: "Difficulty level is required",
  },
  serving_size: {
    required: "Serving size is required",
    max:{
      value:99999,
      message:"Cook time value must be less than or equal to 99999"
    }
  },
  description: {
    required: "This field is required",
  },
  dietary_plan: {
    required: "This field is required",
  },
  allergen_informations: {
    required: "This field is required",
  },
};

export const EmployeeValidations = {
  name: {
    required: "Employee name is required",
  },
  email: {
    pattern: {
      value: EMAIL_REGEX,
      message: "Please enter a valid email",
    },
  },

  zip_code: {
    required: "ZIP code  is required",
  },
};

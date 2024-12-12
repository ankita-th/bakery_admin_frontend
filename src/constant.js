import { T } from "./utils/languageTranslator";

export const RAW_MATERIALS_ITEMS_PER_PAGE = 10;
export const TODO_ITEMS_PER_PAGE = 10;
export const CONFIGURATION_ITEMS_PER_PAGE = 10;
export const ITEMS_PER_PAGE = 10;

export const DUMMY_PRODUCT_DATA = [
  {
    id: 9,
    category: 2,
    sku: "00-cake-2991",
    name: "MIne Cakes",
    description: "This is tasty cheese cake",
    is_active: false,
    status: "available",
    images: [
      {
        id: 4,
        image:
          "http://192.168.1.86:8000/media/product_images/Screenshot_from_2024-10-21_10-16-08_k9pr89I.png",
        product: 9,
      },
    ],
    variants: [],
  },
  {
    id: 4,
    category: 2,
    sku: "00-cake-1323",
    name: "MIne Cakes",
    description: "This is tasty cheese cake",
    is_active: false,
    status: "available",
    images: [],
    variants: [],
  },
  {
    id: 11,
    category: 2,
    sku: "00-cake-2903",
    name: "MIne Cakes",
    description: "This is tasty cheese cake",
    is_active: false,
    status: "available",
    images: [
      {
        id: 6,
        image:
          "http://192.168.1.86:8000/media/product_images/Screenshot_from_2024-10-21_10-16-08_9GaEzEq.png",
        product: 11,
      },
    ],
    variants: [],
  },
  {
    id: 1,
    category: 2,
    sku: "00-cake-13009",
    name: "MIne Cakes",
    description: "This is tasty cheese cake",
    is_active: false,
    status: "available",
    images: [],
    variants: [],
  },
  {
    id: 5,
    category: 2,
    sku: "00-cake-1112",
    name: "MIne Cakes",
    description: "This is tasty cheese cake",
    is_active: false,
    status: "available",
    images: [
      {
        id: 1,
        image:
          "http://192.168.1.86:8000/media/product_images/Screenshot_from_2024-10-21_10-16-08.png",
        product: 5,
      },
    ],
    variants: [],
  },
  {
    id: 2,
    category: 2,
    sku: "00-cake-1303",
    name: "MIne Cakes",
    description: "This is tasty cheese cake",
    is_active: false,
    status: "available",
    images: [],
    variants: [],
  },
  {
    id: 3,
    category: 2,
    sku: "00-cake-1324",
    name: "MIne Cakes",
    description: "This is tasty cheese cake",
    is_active: false,
    status: "available",
    images: [],
    variants: [],
  },
  {
    id: 8,
    category: 2,
    sku: "00-cake-2992",
    name: "MIne Cakes",
    description: "This is tasty cheese cake",
    is_active: false,
    status: "available",
    images: [],
    variants: [],
  },
  {
    id: 12,
    category: 2,
    sku: "00-cake-2114",
    name: "MIne Cakes",
    description: "This is tasty cheese cake",
    is_active: false,
    status: "available",
    images: [
      {
        id: 7,
        image:
          "http://192.168.1.86:8000/media/product_images/Screenshot_from_2024-10-21_10-16-08_t51wQWy.png",
        product: 12,
      },
    ],
    variants: [
      {
        id: 7,
        product: 12,
        weight: 100,
        price: "390.90",
        quantity: 0,
        sku: "00-cake-2114-VAR-0-4051",
        start_series: null,
        end_series: null,
      },
      {
        id: 8,
        product: 12,
        weight: 100,
        price: "390.90",
        quantity: 0,
        sku: "00-cake-2114-VAR-0-1920",
        start_series: null,
        end_series: null,
      },
    ],
  },
  {
    id: 6,
    category: 2,
    sku: "00-cake-1003",
    name: "MIne Cakes",
    description: "This is tasty cheese cake",
    is_active: false,
    status: "available",
    images: [
      {
        id: 2,
        image:
          "http://192.168.1.86:8000/media/product_images/Screenshot_from_2024-10-21_10-16-08_bQSvvpU.png",
        product: 6,
      },
    ],
    variants: [
      {
        id: 1,
        product: 6,
        weight: 100,
        price: "390.90",
        quantity: 0,
        sku: "00-cake-1003-VAR--0",
        start_series: null,
        end_series: null,
      },
    ],
  },
];

export const DEFAULT_ERROR_MESSAGE = "Something went wrong! please try again";
export const INVALID_ID = "Invalid ID";

export const allowedImageTypes = [
  "image/png",
  "image/jpeg", // Covers both .jpg and .jpeg
  // "image/svg+xml",
  //   "image/gif",
  //   "image/webp",
];

export const today = new Date().toISOString().split("T")[0];
export const DEFAULT_CLASS =
  "px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all";

export const OPTIONS = [
  { value: "Option1", label: T["option1"] },
  { value: "Option2", label: T["option2"] },
  { value: "Option3", label: T["option3"] },
];

export const SORT_BY_OPTIONS = [
  { value: "newest", label: T["newest"] },
  { value: "oldest", label: T["oldest"] },
];
export const PAYMENT_TYPE_OPTIONS = [{ value: "card", label: T["card"] }];

export const ORDERS_TYPE_OPTIONS = [
  { value: "declined", label: T["declined"] },
  { value: "accepted", label: T["accepted"] },
  { value: "pending", label: T["pending"] },
];

export const DUMMY_TODO_DATA = [
  {
    id: 3,
    task_id: 100,
    title: "Order Ingredients",
    description: "Order 50 lbs of flour and sugar",
    priority: "High",
    start_date: "2024-10-12",
    assigned_to: "vandana",
    end_date: "2024-10-15",
    status: "Not Started",
    notes: "Use supplier ABC",
    status: "unassigned",
  },
  {
    task_id: 101,
    title: "Staff Scheduling",
    description: "Schedule shifts for October",
    priority: "High",
    start_date: "",
    end_date: "2024-10-15",
    assigned_to: "John",
    status: "Not Started",
    notes: "Use supplier ABC",
  },
];

export const PRIORITY_OPTIONS = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];
export const YYYY_MM_DD = "YYYY-MM-DD";

export const STATE_OPTIONS = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "District of Columbia", value: "DC" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

// export const SWEDEN_COUNTY_OPTIONS = [
//   { label: "Blekinge", value: "BL" },
//   { label: "Dalarna", value: "DL" },
//   { label: "Gotland", value: "GT" },
//   { label: "Gävleborg", value: "GV" },
//   { label: "Halland", value: "HL" },
//   { label: "Jämtland", value: "JM" },
//   { label: "Jönköping", value: "JK" },
//   { label: "Kalmar", value: "KL" },
//   { label: "Kronoberg", value: "KR" },
//   { label: "Norrbotten", value: "NB" },
//   { label: "Skåne", value: "SN" },
//   { label: "Stockholm", value: "ST" },
//   { label: "Södermanland", value: "SD" },
//   { label: "Uppsala", value: "UP" },
//   { label: "Värmland", value: "VL" },
//   { label: "Västerbotten", value: "VB" },
//   { label: "Västernorrland", value: "VN" },
//   { label: "Västmanland", value: "VM" },
//   { label: "Västra Götaland", value: "VG" },
//   { label: "Örebro", value: "OR" },
//   { label: "Östergötland", value: "OG" },
// ];

export const SWEDEN_COUNTY_OPTIONS = [
  { label: "Stockholm", value: "Stockholm" },
  { label: "Västernorrland", value: "Västernorrland" },
  { label: "Västmanland", value: "Västmanland" },
  { label: "Västra Götaland", value: "Västra Götaland" },
  { label: "Östergötland", value: "Östergötland" },
  { label: "Dalarna", value: "Dalarna" },
  { label: "Gävleborg", value: "Gävleborg" },
  { label: "Gotland", value: "Gotland" },
  { label: "Halland", value: "Halland" },
  { label: "Jämtland", value: "Jämtland" },
  { label: "Jönköping", value: "Jönköping" },
  { label: "Kalmar", value: "Kalmar" },
  { label: "Kristianstad", value: "Kristianstad" },
  { label: "Kopparberg", value: "Kopparberg" },
  { label: "Skåne", value: "Skåne" },
  { label: "Södermanland", value: "Södermanland" },
  { label: "Uppsala", value: "Uppsala" },
  { label: "Värmland", value: "Värmland" },
  { label: "Västerbotten", value: "Västerbotten" },
  { label: "Blekinge", value: "Blekinge" },
  { label: "Nordmaling", value: "Nordmaling" },
  { label: "Örebro", value: "Örebro" },
];

export const DUMMY_EMPLOYEE_DATA = [
  {
    id: 1,
    name: "Jane Smith",
    role: "Accountant",
    email: "jane.smith@bakers.com",
    phone: "123-456-7890",
    shift: "9AM-5PM",
    status: true,
  },
  {
    id: 2,
    name: "John Doe",
    role: "Supervisor",
    email: "john.doe@bakers.com",
    phone: "123-456-7890",
    shift: "9AM-5PM",
    status: true,
  },
];
export const MEASURE_OPTIONS = [
  { label: "Kilogram", value: "kg" },
  { label: "Gram", value: "g" },
  // uncomment after it get's fixed from backend
  // { label: "Litre", value: "ltr" },
  // { label: "Mili Litre", value: "ml" },
  // { label: "Pound", value: "lb" },
];

export const INVENTORY_PAGE_COLUMNS = [
  T["character_name"],
  T["current_stock"],
  T["reorder_level"],
  T["barcode_no"],
  T["sku"],
  T["status"],
  T["action"],
];
export const DUMMY_CUSTOMER_DATA = [
  // Update required: update according to the api parameters /////////
  {
    id: 1,
    customer_type: "Individual",
    name: "John Doe",
    contact_person: "michael Johnson",
    contact_details: "John@example.com",
    address: "45 bakery lane  london",
    order_history: "5 orders",
  },
  {
    id: 2,
    customer_type: "Company",
    name: "Alice Smith",
    contact_person: "michael Johnson",
    contact_details: "John@example.com",
    address: "45 bakery lane  london",
    order_history: "5 orders",
  },
  {
    id: 3,
    customer_type: "Company",
    name: "John Doe",
    contact_person: "michael Johnson",
    contact_details: "John@example.com",
    address: "45 bakery lane  london",
    order_history: "5 orders",
  },
];

export const DUMMY_PAYMENT_DATA = [
  {
    id: 1,
    customer_name: "Sarah Wiliiams",
    date: "19/11/2024",
    order_id: "Botal",
    payment_method: "Credit Card",
    amount: 100,
    status: "Successful",
    transaction_id: "Txpdjnm",
  },
  {
    id: 2,
    customer_name: "Jake Wiliiams",
    date: "19/11/2024",
    order_id: "Botal",
    payment_method: "Credit Card",
    amount: 100,
    status: "Successful",
    transaction_id: "Txpdjnm",
  },
  {
    id: 3,
    customer_name: "devid Wiliiams",
    date: "19/11/2024",
    order_id: "Botal",
    payment_method: "Credit Card",
    amount: 100,
    status: "Successful",
    transaction_id: "Txpdjnm",
  },
];

export const DUMMY_NOTIFICATION_DATA = [
  {
    id: 1,
    title: "Lorem posted new job Housekeeping",
    description:
      "A description is a statement that provides details about a person or thing, or a communication method that aims to make something vivid",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Lorem posted new job Housekeeping",
    description:
      "A description is a statement that provides details about a person or thing, or a communication method that aims to make something vivid",
    time: "2 min ago",
  },
  {
    id: 3,
    title: "Lorem posted new job Housekeeping",
    description:
      "A description is a statement that provides details about a person or thing, or a communication method that aims to make something vivid",
    time: "2 min ago",
  },
  {
    id: 4,
    title: "Lorem posted new job Housekeeping",
    description:
      "A description is a statement that provides details about a person or thing, or a communication method that aims to make something vivid",
    time: "2 min ago",
  },
  {
    id: 5,
    title: "Lorem posted new job Housekeeping",
    description:
      "A description is a statement that provides details about a person or thing, or a communication method that aims to make something vivid",
    time: "2 min ago",
  },
  {
    id: 6,
    title: "Lorem posted new job Housekeeping",
    description:
      "A description is a statement that provides details about a person or thing, or a communication method that aims to make something vivid",
    time: "2 min ago",
  },
  {
    id: 7,
    title: "Lorem posted new job Housekeeping",
    description:
      "A description is a statement that provides details about a person or thing, or a communication method that aims to make something vivid",
    time: "2 min ago",
  },
];

export const DUMMY_INVENTORY_DATA = [
  {
    id: 1,
    name: "Sourdough",
    current_stock: "50 loaves",
    reorder: "20 loaves",
    sku: "SOU1234",
    status: "in_stock",
    barcode_no: "78901",
    barcode_to: "78653",
  },
  {
    id: 2,
    name: "Rye bread",
    current_stock: "50 loaves",
    reorder: "20 loaves",
    sku: "SOU1234",
    status: "in_stock",
    barcode_no: "78901",
    barcode_to: "78653",
  },

  {
    id: 3,
    name: "Semla",
    current_stock: "50 loaves",
    reorder: "20 loaves",
    sku: "SOU1234",
    status: "in_stock",
    barcode_no: "78901",
    barcode_to: "78653",
  },
];
export const DUMMY_SUPPORT_DATA = [
  {
    id: 1,
    name: "John Doe",
    email: "Individual",
    issue_description: "michael Johnson",
    status: "John@example.com",
    date_created: "45 bakery lane  london",
    assigned_to: "5 orders",
  },
  {
    id: 2,
    name: "John Doe",
    email: "Individual",
    issue_description: "michael Johnson",
    status: "John@example.com",
    date_created: "45 bakery lane  london",
    assigned_to: "5 orders",
  },
  {
    id: 3,
    name: "John Doe",
    email: "Individual",
    issue_description: "michael Johnson",
    status: "John@example.com",
    date_created: "45 bakery lane  london",
    assigned_to: "5 orders",
  },
  {
    id: 4,
    name: "John Doe",
    email: "Individual",
    issue_description: "michael Johnson",
    status: "John@example.com",
    date_created: "45 bakery lane  london",
    assigned_to: "5 orders",
  },
  {
    id: 5,
    name: "John Doe",
    email: "Individual",
    issue_description: "michael Johnson",
    status: "John@example.com",
    date_created: "45 bakery lane  london",
    assigned_to: "5 orders",
  },
  {
    id: 6,
    name: "John Doe",
    email: "Individual",
    issue_description: "michael Johnson",
    status: "John@example.com",
    date_created: "45 bakery lane  london",
    assigned_to: "5 orders",
  },
];

export const DISCOUNT_TYPE_OPTIONS = [
  { label: "Amount", value: "amount" },
  { label: "Percentage", value: "percentage" },
];

export const PURCHASE_REQUIREMENT_OPTIONS = [
  // update these things according
  {
    label: "No minimum requirements",
    value: "no_requirement",
  },
  {
    label: "Minimum purchase amount ($)",
    value: "minimum_purchase",
  },
  {
    label: "Minimum quantity of items",
    value: "minimum_items",
  },
];

export const CUSTOMER_ELIGIBILITY_OPTIONS = [
  {
    label: "All customers",
    value: "all_customer",
  },
  {
    label: "Specific customer segments",
    value: "specific_customer",
  },
];

export const COUNTRY_OPTIONS = [
  { label: "All countries", value: "all_countries" },
  { label: "Selected countries", value: "selected_countries" },
];

export const STATES_OPTIONS = [
  { label: "All states", value: "all_states" },
  { label: "Selected states", value: "specific_states" },
];

export const CUSTOMER_SPECIFIC_OPTIONS = [
  {
    label: "Customers who have not purchased ",
    value: "havent_purchased",
  },
  {
    label: "Customers who have purchased recently",
    value: "recent_purchased",
  },
  {
    label: "Customers who have purchased at least once  ",
    value: "purchased_once",
  },
  {
    label: "Customers who have purchased more than once",
    value: "purchased_more_than_once",
  },
  // {
  //   label: "Customers who have purchased at least once",
  //   value: "purchased_at_least_once",
  // },
];

export const COMBINATION_OPTIONS = [
  {
    label: "Product discounts",
    value: "product_discounts",
  },
  {
    label: "Order discounts",
    value: "order_discounts",
  },
  {
    label: "Shipping discounts",
    value: "shipping_discounts",
  },
];

export const APPLIES_TO_OPTIONS = [
  { label: "All Collections", value: "all_products" },
  { label: "Specific Collections", value: "specific_products" },
];

export const DISCOUNTED_VALUE_OPTIONS = [
  { label: "Percentage", value: "percentage" },
  { label: "Amount off each", value: "amount_off_each" },
  { label: "Free", value: "free" },
];

export const DISCOUNTED_USAGE_OPTIONS = [
  {
    label: "Limit to one use per customer",
    value: "per_customer",
  },
  {
    label: "Limit number of times this discount can be used in total",
    value: "limit_discount_usage_time",
  },
];
export const COMBINATION_OPTIONS_SHIPPING = [
  {
    label: "Product discounts",
    value: "product_discounts",
  },
  {
    label: "Order discounts",
    value: "order_discounts",
  },
];
export const BACKDOOR_OPTIONS = [
  {
    label: "Allow ",
    value: "allow",
  },
  {
    label: "Do Not Allow",
    value: "Do Not Allow",
  },
];

export const PNG_AND_JPG = "image/png, image/jpeg";

export const AVAILABILITY_OPTIONS = [
  { label: "Available", value: "available" },
  { label: "Not Available", value: "unavailable" },
];

export const SHIFT_OPTIONS = [
  { value: "Morning", label: "Morning" },
  { value: "Night", label: "Night" },
];

export const ROLE_OPTIONS = [
  { value: "accountant", label: "Accountant" },
  { value: "worker", label: "Worker" },
  { value: "admin", label: "Admin" },
];
export const TYPE_OPTIONS = [
  { label: T["published"], value: "published" },
  { label: T["draft"], value: "draft" },
  { label: T["all"], value: "all" },
];

export const ACTIONS = [
  { label: T["duplicate"], value: "duplicate" },
  { label: T["delete"], value: "delete" },
  { label: T["draft"], value: "draft" },
];

export const DUMMY_EMPLOYEE = {
  id: 4,
  email: "candidate2@email.com",
  role: "worker",
  first_name: "Candidate",
  last_name: "Vashisht",
  employee_detail: {
    employee_id: "kjhhkiu",
    address: "Artillerigatan, Stockholm, Sweden",
    city: "Alingsås, Sweden",
    state: "VB",
    country: "SE",
    zip_code: "14010",
    contact_no: "0987654411",
    hiring_date: "2024-11-12",
    shift: "Night",
  },
};
export const EMPLOYEE_ID_ERROR = "An employee with this ID already exists.";
export const DUMMY_ORDERS_DATA = [
  {
    id: 1,
    customer_name: "Sarah Wiliiams",
    date: "2024-11-23T00:00:00Z",
    items: "4X Dinner role",
    quantity: "02",
    reason_for_decline: "out of stock",
  },
  {
    id: 2,
    customer_name: "Sarah Wiliiams",
    date: "2024-11-23T00:00:00Z",
    items: "6X Dinner role",
    quantity: "01",
    reason_for_decline: 100,
  },
  {
    id: 3,
    customer_name: "Sarah Wiliiams",
    date: "2024-11-23T00:00:00Z",
    items: "8X Dinner role",
    quantity: "98",
    reason_for_decline: 100,
  },
  {
    id: 4,
    customer_name: "Sarah Wiliiams",
    date: "2024-11-23T00:00:00Z",
    items: "7X Dinner role",
    quantity: "7",
    reason_for_decline: 100,
  },
];
export const SAME_PRODUCT_NAME_ERROR = `duplicate key value violates unique constraint "product_product_name_04ac86ce_uniq"
DETAIL:  Key (name)=(Wheat) already exists.
 fieldError`;
export const EMPLOYEE_SORT_BY_OPTIONS = [
  { label: T["active"], value: "active" },
  { label: T["in_active"], value: "inactive" },
];

export const RECIPE_MEASURE_OPTIONS = [
  { label: "Gram", value: "g" },
  { label: "Kilogram", value: "kg" },
  { label: "Teaspoon", value: "tsp" },
  { label: "Tablespoon", value: "tbsp" },
  { label: "Ounce", value: "oz" },
  { label: "Pound", value: "lb" },
  { label: "Cup", value: "cup" },
  { label: "Milliliter", value: "ml" },
  { label: "Liter", value: "l" },
];

export const CUSTOMER_BUYS_OPTIONS = [
  { label: "Minimum quantity of items", value: "minimum_items_quantity" },
  { label: "Minimum purchase amount", value: "minimum_purchase_amount" },
];
export const ITEMS_FROM_OPTIONS = [
  { label: "All products", value: "all_product" },
  { label: "Specify product", value: "specific_product" },
];

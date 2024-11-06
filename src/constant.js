export const PRODUCTS_ITEMS_PER_PAGE = 10;
export const CATEGORIES_ITEMS_PER_PAGE = 10;
export const RAW_MATERIALS_ITEMS_PER_PAGE = 10;
export const TODO_ITEMS_PER_PAGE = 10;
export const CONFIGURATION_ITEMS_PER_PAGE = 10;
export const RECIPE_ITEMS_PER_PAGE = 10;

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

export const DEFAULT_ERROR_MESSAGE = "Something Went Wrong";

export const allowedImageTypes = [
  "image/png",
  "image/svg+xml",
  "image/jpeg", // Covers both .jpg and .jpeg
  //   "image/gif",
  //   "image/webp",
];

export const today = new Date().toISOString().split("T")[0];
export const DEFAULT_CLASS =
  "px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all";

export const OPTIONS = [
  { value: "Option1", label: "Option1" },
  { value: "Option2", label: "Option2" },
  { value: "Option3", label: "Option3" },
];

export const SORT_BY_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

export const DUMMY_TODO_DATA = [
  {
    task_id: 100,
    title: "Order Ingredients",
    description: "Order 50 lbs of flour and sugar",
    priority: "High",
    start_date: "",
    assigned_to: "John",
    end_date: "2024-10-15",
    status: "Not Started",
    notes: "Use supplier ABC",
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

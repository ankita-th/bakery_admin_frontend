export const PRODUCTS_ITEMS_PER_PAGE = 10;
export const CATEGORIES_ITEMS_PER_PAGE = 10;
export const RAW_MATERIALS_ITEMS_PER_PAGE = 10;

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


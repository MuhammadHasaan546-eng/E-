export const registerFromControls = [
  {
    name: "userName",
    label: "User",
    placeholder: "Enter your name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFromControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const productFormControls = [
  {
    name: "title",
    label: "Product Title",
    placeholder: "Enter product title",
    componentType: "input",
    type: "text",
    minLength: 3,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter product description",
    componentType: "textarea",
    minLength: 10,
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Select category",
    componentType: "select",

    options: [
      { label: "Men's Clothing", value: "mens_clothing" },
      { label: "Women's Clothing", value: "womens_clothing" },
      { label: "Kids Clothing", value: "kids_clothing" },
      { label: "Shoes", value: "shoes" },
      { label: "Accessories", value: "accessories" },
      { label: "Bags", value: "bags" },
      { label: "Watches", value: "watches" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    placeholder: "Enter brand name",
    componentType: "select",

    options: [
      { label: "Nike", value: "nike" },
      { label: "Adidas", value: "adidas" },
      { label: "Puma", value: "puma" },
      { label: "Under Armour", value: "under_armour" },
      { label: "Reebok", value: "reebok" },
      { label: "New Balance", value: "new_balance" },
      { label: "ASICS", value: "asics" },
      { label: "Converse", value: "converse" },
      { label: "Vans", value: "vans" },
      { label: "Zara", value: "zara" },
      { label: "H&M", value: "hm" },
      { label: "Levi's", value: "levis" },
      { label: "Uniqlo", value: "uniqlo" },
      { label: "Gucci", value: "gucci" },
      { label: "Louis Vuitton", value: "louis_vuitton" },
      { label: "Balenciaga", value: "balenciaga" },
      { label: "Prada", value: "prada" },
      { label: "Skechers", value: "skechers" },
      { label: "Timberland", value: "timberland" },
      { label: "Columbia", value: "columbia" },
      { label: "The North Face", value: "the_north_face" },
      { label: "Crocs", value: "crocs" },
    ],
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter product price",
    componentType: "input",
    type: "number",
    min: 0.01,
    step: "any",
  },
  {
    name: "salePrice",
    label: "Sale Price",
    placeholder: "Enter product sale price",

    componentType: "input",
    type: "number",
    min: 0,
    step: "any",
  },

  {
    name: "stock",
    label: "Stock Quantity",
    placeholder: "Enter stock quantity",
    componentType: "input",
    type: "number",
    min: 0,
  },
];

export const shoppingViewHeaderIcon = [
  { id: "home", label: "Home", path: "/shop/home" },
  { id: "mens_clothing", label: "Men", path: "/shop/listing" },
  { id: "womens_clothing", label: "Women", path: "/shop/listing" },
  { id: "kids_clothing", label: "Kids", path: "/shop/listing" },
  { id: "shoes", label: "Footwear", path: "/shop/listing" },
  { id: "watches", label: "Watches", path: "/shop/listing" },
  { id: "accessories", label: "Accessories", path: "/shop/listing" },
  { id: "bags", label: "Bags", path: "/shop/listing" },
  { id: "search", label: "Search", path: "/shop/search" },
];

export const brandOptionMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  under_armour: "Under Armour",
  reebok: "Reebok",
  new_balance: "New Balance",
  asics: "ASICS",
  converse: "Converse",
  vans: "Vans",
  zara: "Zara",
  hm: "H&M",
  levis: "Levi's",
  uniqlo: "Uniqlo",
  gucci: "Gucci",
  louis_vuitton: "Louis Vuitton",
  balenciaga: "Balenciaga",
  prada: "Prada",
  skechers: "Skechers",
  timberland: "Timberland",
  columbia: "Columbia",
  the_north_face: "The North Face",
  crocs: "Crocs",
};

export const categoryOptionMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  footwear: "Footwear",
  jewelry: "Jewelry",
  accessories: "Accessories",
  bags: "Bags",
  watches: "Watches",
};

export const filterOptions = {
  categories: [
    { id: "mens_clothing", label: "Men's Clothing" },
    { id: "womens_clothing", label: "Women's Clothing" },
    { id: "kids_clothing", label: "Kids Clothing" },
    { id: "shoes", label: "Shoes" },
    { id: "accessories", label: "Accessories" },
    { id: "bags", label: "Bags" },
    { id: "watches", label: "Watches" },
  ],
  Brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "under_armour", label: "Under Armour" },
    { id: "reebok", label: "Reebok" },
    { id: "new_balance", label: "New Balance" },
    { id: "asics", label: "ASICS" },
    { id: "converse", label: "Converse" },
    { id: "vans", label: "Vans" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
    { id: "levis", label: "Levi's" },
    { id: "uniqlo", label: "Uniqlo" },
    { id: "gucci", label: "Gucci" },
    { id: "louis_vuitton", label: "Louis Vuitton" },
    { id: "balenciaga", label: "Balenciaga" },
    { id: "prada", label: "Prada" },
    { id: "skechers", label: "Skechers" },
    { id: "timberland", label: "Timberland" },
    { id: "columbia", label: "Columbia" },
    { id: "the_north_face", label: "The North Face" },
    { id: "crocs", label: "Crocs" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];
//// Home page
/// brands
export const brandColorMap = {
  nike: "from-gray-900 to-gray-700",
  adidas: "from-blue-900 to-blue-700",
  puma: "from-red-600 to-rose-500",
  under_armour: "from-red-700 to-red-500",
  reebok: "from-blue-600 to-indigo-500",
  new_balance: "from-red-600 to-gray-600",
  asics: "from-blue-700 to-cyan-500",
  converse: "from-red-600 to-orange-500",
  vans: "from-gray-800 to-gray-600",
  zara: "from-gray-900 to-gray-700",
  hm: "from-red-500 to-rose-400",
  levis: "from-red-700 to-red-500",
  uniqlo: "from-red-500 to-rose-500",
  gucci: "from-emerald-700 to-green-500",
  louis_vuitton: "from-amber-800 to-yellow-600",
  balenciaga: "from-gray-900 to-gray-700",
  prada: "from-gray-800 to-gray-600",
  skechers: "from-blue-600 to-sky-500",
  timberland: "from-amber-700 to-yellow-500",
  columbia: "from-blue-700 to-sky-500",
  the_north_face: "from-red-600 to-gray-700",
  crocs: "from-green-500 to-emerald-400",
};

// Featured brands (top brands to show prominently)
export const featuredBrandIds = [
  "nike",
  "adidas",
  "gucci",
  "prada",
  "zara",
  "louis_vuitton",
  "puma",
  "converse",
  "levis",
  "the_north_face",
  "balenciaga",
  "vans",
];
//// Search

export const CATEGORIES = [
  { id: "mens_clothing", label: "Men's Clothing" },
  { id: "womens_clothing", label: "Women's Clothing" },
  { id: "kids_clothing", label: "Kids' Clothing" },
  { id: "shoes", label: "Shoes" },
  { id: "accessories", label: "Accessories" },
  { id: "bags", label: "Bags" },
  { id: "watches", label: "Watches" },
];

export const BRANDS = [
  { id: "nike", label: "Nike" },
  { id: "adidas", label: "Adidas" },
  { id: "gucci", label: "Gucci" },
  { id: "prada", label: "Prada" },
  { id: "louis_vuitton", label: "Louis Vuitton" },
  { id: "balenciaga", label: "Balenciaga" },
  { id: "zara", label: "Zara" },
  { id: "levis", label: "Levi's" },
  { id: "puma", label: "Puma" },
  { id: "converse", label: "Converse" },
];

export const SORT_OPTIONS = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

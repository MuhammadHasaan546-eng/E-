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
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter product description",
    componentType: "textarea",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Select category",
    componentType: "select",
    // options: [
    //   { label: "Men", value: "men" },
    //   { label: "Women", value: "women" },
    //   { label: "Other", value: "other" },
    // ],
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

    // options: [
    //   { label: "Nike", value: "nike" },
    //   { label: "Adidas", value: "adidas" },
    //   { label: "Puma", value: "puma" },
    // ],
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
  },
  {
    name: "salePrice",
    label: "Sale Price",
    placeholder: "Enter product sale price",

    componentType: "input",
    type: "number",
  },

  {
    name: "stock",
    label: "Stock Quantity",
    placeholder: "Enter stock quantity",
    componentType: "input",
    type: "number",
  },
];

export const shoppingViewHeaderIcon = [
  { id: "home", label: "Home", path: "/shop/home" },

  { id: "men", label: "Men", path: "/shop/listing" },
  { id: "women", label: "Women", path: "/shop/listing" },
  { id: "kids", label: "Kids", path: "/shop/listing" },
  { id: "footwear", label: "Footwear", path: "/shop/listing" },
  { id: "jewelry", label: "Jewelry", path: "/shop/listing" },
  { id: "accessories", label: "Accessories", path: "/shop/listing" },
  { id: "bags", label: "Bags", path: "/shop/listing" },
];

export const filterOptions = {
  category: [
    { label: "Men's Clothing" },
    { label: "Women's Clothing" },
    { label: "Kids Clothing" },
    { label: "Shoes" },
    { label: "Accessories" },
    { label: "Bags" },
    { label: "Watches" },
  ],
  brand: [
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
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "title-asc", label: "Title: A to Z" },
  { id: "title-desc", label: "Title: Z to A" },
];

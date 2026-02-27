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

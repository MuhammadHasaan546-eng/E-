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
    options: [
      { label: "Men", value: "men" },
      { label: "Women", value: "women" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    placeholder: "Enter brand name",
    componentType: "input",
    type: "text",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter product price",
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
  {
    name: "image",
    label: "Product Image",
    componentType: "input",
    type: "file",
  },
];

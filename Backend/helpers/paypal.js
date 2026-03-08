import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox", // or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID || "AS9-S6S3-S7S3-S8S3",
  client_secret: process.env.PAYPAL_CLIENT_SECRET || "E-S6S3-S7S3-S8S3",
});

export default paypal;

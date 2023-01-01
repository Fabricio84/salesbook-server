import { Record, String, Number, Array } from "runtypes";

export const UserData = Record({
  email: String,
  password: String,
  role: String
});

// Type for new sale
export const ProductData = Record({
    description: String,
    price: Number,
    amount: Number
});

export const Payment = Record({
    date: String,
    price: Number
});

export const SaleData = Record({
  date: String,
  customerId: String,
  itens: Array(String),
  priceTotal: Number,
  discounts: Number,
  payments: Array(Payment)
});
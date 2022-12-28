import { Record, String, Number, Array } from "runtypes";

// Type for new sale
export const Product = Record({
    description: String,
    price: Number,
    amount: Number
});

export const Payment = Record({
    number: Number,
    date: String,
    price: Number
});

export const SaleData = Record({
  date: String,
  CustomerID: String,
  Products: Array(Product),
  PriceTotal: Number,
  discounts: Number,
  Payments: Array(Payment)
});
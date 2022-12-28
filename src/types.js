import { Record, String, Number, Array } from "runtypes";

// Type for new sale
const Money = Record({
  amount: Number,
  currencyCode: String,
});

export const Product = Record({
    description: String,
    price: Money,
    amount: Number
});

export const Payment = Record({
    number: Number,
    date: String,
    price: Money
});

export const SaleData = Record({
  date: String,
  CustomerID: String,
  Products: Array(Product),
  PriceTotal: Money,
  discounts: Money,
  Payments: Array(Payment)
});
import { Record, String, Number, Array } from "runtypes";

// Type for new sale
export const Product = Record({
    description: String,
    price: Number,
    amount: Number
});

export const Payment = Record({
    date: String,
    price: Number
});

export const SaleItem = Record({
  productId: String
});

export const SaleData = Record({
  date: String,
  customerId: String,
  itens: Array(SaleItem),
  priceTotal: Number,
  discounts: Number,
  payments: Array(String)
});
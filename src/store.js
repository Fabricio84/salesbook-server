import DynamoDb from '@cyclic.sh/dynamodb'

// Initialize AWS DynamoDB
const db = DynamoDb(process.env.CYCLIC_DB)

export const Salestore = db.collection("sales")

export const SaleItemstore = db.collection("sales-itens")

export const Productstore = db.collection("products")

export const Paymentstore = db.collection("payments")
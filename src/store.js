import DynamoDb from '@cyclic.sh/dynamodb'

// Initialize AWS DynamoDB
const db = DynamoDb(process.env.CYCLIC_DB)

export const SalesStore = db.collection("sales")

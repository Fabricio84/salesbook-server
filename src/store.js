import DynamoDb from '@cyclic.sh/dynamodb'

// Initialize AWS DynamoDB
const db = DynamoDb(process.env.CYCLIC_DB)

export const Userstore = db.collection("users")

export const Salestore = db.collection("sales")

export const Productstore = db.collection("products")

export const Paymentstore = db.collection("payments")

export async function All(collectionName) {
	const store = db.collection(collectionName)

	const { results: metaData } = await store.list()

    const models = await Promise.all(
      metaData.map(async ({ key }) => (await store.get(key)).props)
    )

    return models
}

export async function FindFirst(collectionName, property, value) {
	const values = await All(collectionName)

	const model = values.find(item => item[property] === value)

	return model
}
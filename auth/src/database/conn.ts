import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

const collections: { auth: mongoDB.Collection<mongoDB.BSON.Document> } = {
  auth: {} as mongoDB.Collection<mongoDB.BSON.Document>,
};

async function connectToDatabase() {
  dotenv.config();
  const db_conn_string = process.env.DB_CONN_STRING;
  const db_name = process.env.DB_NAME;
  const auth_collection_name = process.env.AUTH_COLLECTION_NAME;
  if (!db_conn_string || !db_name || !auth_collection_name) {
    throw new Error(
      "DB_CONN_STRING, DB_NAME or AUTH_COLLECTION_NAME not set in .env file"
    );
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING as string
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const authCollection: mongoDB.Collection = db.collection(
    process.env.AUTH_COLLECTION_NAME as string
  );
  collections.auth = authCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${authCollection.collectionName}`
  );
}

export { connectToDatabase, collections };

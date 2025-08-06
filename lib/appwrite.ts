import { Account, Client, Databases, ID, Query, Storage } from "appwrite";

const projectID = "starbornlab";
const apiEndpoint = "https://fra.cloud.appwrite.io/v1";

const databaseId = "starbornlabDB";
const roomsCollectionId = "rooms";
const bookingCollectionId = "bookingID";
const reviewsCollectionId = "reviewsID";
const userProfilesId = "userProfilesID";
const blogsCollectionId = "blogsID";
const paymentTransactionsCollectionId = "payment_transactions";
const imagesBucketId = "688678fb002e60d3a618";

const client = new Client().setEndpoint(apiEndpoint).setProject(projectID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export {
  ID,
  client,
  Query,
  account,
  databases,
  storage,
  databaseId,
  roomsCollectionId,
  bookingCollectionId,
  reviewsCollectionId,
  userProfilesId,
  blogsCollectionId,
  paymentTransactionsCollectionId,
  imagesBucketId,
};

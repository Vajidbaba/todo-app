import { Client, Databases, ID } from 'appwrite'; // ✅ Add ID here

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Appwrite endpoint
  .setProject('6872954c00241115674b'); // ✅ Project ID

const databases = new Databases(client);

export { databases, ID }; // ✅ Export ID here

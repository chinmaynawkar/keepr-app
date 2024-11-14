"use server";

import { cookies } from "next/headers";
import { appwriteConfig } from "./config";
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";

// there are two types of clients:
// - session client
// - admin client but we will only use the session client for now
export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  const session = (await cookies()).get("appwrite-session");

  if (!session || !session.value) {
    throw new Error("No session found");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

// we are creating new client connection for every request because of security reasons
// the client is authenticated with the secret key which is stored in the .env.local file

// admin client is used to perform admin operations which has all the permissions
export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};

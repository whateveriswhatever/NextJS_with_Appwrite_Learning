import conf from "@/conf/config";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  // create a new record of user inside appwrite

  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (err: any) {
      throw Error(err);
    }
  }

  async login({ email, password }: LoginUserAccount) {
    //
    try {
      account.createEmailSession(email, password);
    } catch (err: any) {
      throw Error(err);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (err: any) {
      throw Error(err);
    }
    return false;
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (err: any) {
      console.log(
        `Oops. There must be something wrong in getting current user >>>> ${err}`
      );
    }

    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (err: any) {
      console.log(`Oops. Failed to logout >>>> ${err}`);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;

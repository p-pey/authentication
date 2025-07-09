import { cookies } from "next/headers";
import { CookieHandler, CookieOptions } from "./types";

export default class ServerCookieHandler implements CookieHandler {
       private readonly cookieStore: ReturnType<typeof cookies>;

       constructor() {
              this.cookieStore = cookies();
       }

       async get(name: string): Promise<string | undefined> {
              const store = await this.cookieStore;
              return store.get(name)?.value;
       }

       async getAll(): Promise<Record<string, string>> {
              const store = await this.cookieStore;
              const cookieObject: Record<string, string> = {};
              store.getAll().forEach(cookie => {
                     cookieObject[cookie.name] = cookie.value;
              });
              return cookieObject;
       }

       async set(name: string, value: string, options: CookieOptions = {}): Promise<void> {
              const store = await this.cookieStore;
              const defaultOptions: CookieOptions = {
                     httpOnly: true,
                     secure: process.env.NODE_ENV === "production",
                     sameSite: 'strict',
                     path: '/',
                     ...options,
              };
              store.set(name, value, defaultOptions);
       }

       async delete(name: string): Promise<void> {
              const store = await this.cookieStore;
              store.delete(name);
       }
}
import { CookieHandler, CookieOptions } from "./types";


export default class ClientCookieHandler implements CookieHandler {
       async get(name: string): Promise<string | undefined> {
              const cookies = document.cookie.split('; ');
              const cookie = cookies.find(c => c.startsWith(`${name}=`));
              return cookie ? cookie.split('=')[1] : undefined;
       }

       async getAll(): Promise<Record<string, string>> {
              const cookieObject: Record<string, string> = {};
              document.cookie.split('; ').forEach(cookie => {
                     const [name, value] = cookie.split('=');
                     cookieObject[name] = value;
              });
              return cookieObject;
       }

       async set(name: string, value: string, options: CookieOptions = {}): Promise<void> {
              let cookieString = `${name}=${value}`;

              if (options.path) cookieString += `;path=${options.path}`;
              if (options.maxAge) cookieString += `;max-age=${options.maxAge}`;
              if (options.expires) cookieString += `;expires=${options.expires.toUTCString()}`;
              if (options.secure) cookieString += ';secure';
              if (options.sameSite) cookieString += `;samesite=${options.sameSite}`;

              document.cookie = cookieString;
       }

       async delete(name: string): Promise<void> {
              document.cookie = `${name}=;max-age=0;path=/`;
       }
}

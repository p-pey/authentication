export interface CookieOptions {
       httpOnly?: boolean;
       secure?: boolean;
       sameSite?: 'strict' | 'lax' | 'none';
       path?: string;
       maxAge?: number;
       expires?: Date;
}

export interface CookieHandler {
       get(name: string): Promise<string | undefined>;
       getAll(): Promise<Record<string, string>>;
       set(name: string, value: string, options?: CookieOptions): Promise<void>;
       delete(name: string): Promise<void>;
}

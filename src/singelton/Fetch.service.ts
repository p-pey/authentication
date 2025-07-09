
interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

interface FetchOptions extends RequestInit {
    retry?: boolean;
}

class FetchService {
    private readonly baseUrl: string = 'https://randomuser.me';
    private accessToken: string | null = null;
    private refreshToken: string | null = null;
    private refreshPromise: Promise<AuthResponse> | null = null;

    // Set initial tokens
    public setTokens(accessToken: string, refreshToken: string): void {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    // Refresh token logic


    // Main fetch method with authentication
    public async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = new Headers(options.headers || {});

        if (this.accessToken) {
            headers.set('Authorization', `Bearer ${this.accessToken}`);
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });



            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.log(error);
            throw new Error(`Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // Convenience methods
    public async get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        return this.fetch<T>(endpoint, { ...options, method: 'GET' });
    }

    public async post<T>(
        endpoint: string,
        body: unknown,
        options: FetchOptions = {}
    ): Promise<T> {
        return this.fetch<T>(endpoint, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(body),
        });
    }

    public async put<T>(
        endpoint: string,
        body: unknown,
        options: FetchOptions = {}
    ): Promise<T> {
        return this.fetch<T>(endpoint, {
            ...options,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(body),
        });
    }

    public async delete<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        return this.fetch<T>(endpoint, { ...options, method: 'DELETE' });
    }
}
const FetchServiceSingleton = new FetchService();
export default FetchServiceSingleton;
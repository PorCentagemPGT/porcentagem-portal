import { API_URL } from '@/config/api';

const isBrowser = typeof window !== 'undefined';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  tokens: Tokens;
  user: User;
}

export class AuthService {
  private static readonly AUTH_KEY = '@porcentagem:auth';
  private static readonly TOKEN_EXPIRY_MARGIN = 60; // segundos

  static async signIn(credentials: { email: string; password: string }): Promise<Response> {
    return fetch(`${API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  }

  static saveAuth(auth: AuthState): void {
    if (!isBrowser) return;
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(auth));
  }

  static getAuth(): AuthState | null {
    if (!isBrowser) return null;
    
    const auth = localStorage.getItem(this.AUTH_KEY);
    if (!auth) return null;

    try {
      return JSON.parse(auth);
    } catch {
      this.clearAuth();
      return null;
    }
  }

  static clearAuth(): void {
    if (!isBrowser) return;
    localStorage.removeItem(this.AUTH_KEY);
  }

  static getAccessToken(): string | null {
    return this.getAuth()?.tokens.accessToken ?? null;
  }

  static getRefreshToken(): string | null {
    return this.getAuth()?.tokens.refreshToken ?? null;
  }

  static getUser(): User | null {
    return this.getAuth()?.user ?? null;
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  static async logout(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return;

    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
    } finally {
      this.clearAuth();
    }
  }

  static async validateToken(): Promise<boolean> {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/auth/validate`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  }

  static async refreshTokens(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        this.clearAuth();
        return false;
      }

      const { tokens } = await response.json();
      const currentAuth = this.getAuth();
      
      if (currentAuth) {
        this.saveAuth({
          ...currentAuth,
          tokens,
        });
        return true;
      }

      return false;
    } catch {
      this.clearAuth();
      return false;
    }
  }
}

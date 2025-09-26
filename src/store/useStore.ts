import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_email_verified: boolean;
  avatar: string | null;
}

interface AppState {
  user: User | null;
  userId: string | null;
  billing_address_id: string | null;
  token: string | null;
  isAuthenticated: boolean;
  expiresAt: number | null;
  refresh_token: string | null;
  setToken: (
    token: string,
    refresh_token: string,
    expiresAt: number,
    isAuthenticated: boolean
  ) => void;
  setUser: (user: User, userId: string, billing_address_id: string) => void;
  logout: () => void;
}

const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refresh_token: null,
      isAuthenticated: false,
      expiresAt: null,
      userId: null,
      billing_address_id: null,
      setToken: (token, refresh_token, expiresAt, isAuthenticated) =>
        set({
          token,
          expiresAt,
          refresh_token,
          isAuthenticated: isAuthenticated,
        }),
      setUser: (user, userId, billing_address_id) =>
        set({ user, userId, billing_address_id }),
      logout: () =>
        set({
          user: null,
          token: null,
          refresh_token: null,
          expiresAt: null,
          isAuthenticated: false,
          userId: null,
          billing_address_id: null,
        }),
    }),
    {
      name: "auth-cart-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refresh_token: state.refresh_token,
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        billing_address_id: state.billing_address_id,
      }),
    }
  )
);

export default useStore;

import { create } from "zustand";
import { AuthStore } from "@/types/auth";
import { deleteCookie, setCookie } from "cookies-next";

export const useAuth = create<AuthStore>()((set) => ({
  token: null,
  open: false,
  setOpen: (newOpen) => set((state) => ({...state, open: newOpen })),
  setToken: (newToken) => set(state =>  {
    newToken ? setCookie('token', newToken) : deleteCookie('token');  
  return { ...state, token: newToken };
}),
}));
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface useAuthStoreType {
  authUser: any;
  loading: boolean;
  isAuthChecking: boolean;
  checkAuth: () => void;
}

export const useAuthStore = create<useAuthStoreType>((set) => ({
  authUser: null,
  loading: false,
  isAuthChecking: false,
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/checkAuth");
      set({ authUser: response.data });
    } catch (error) {
      console.log("error in checking auth", error);
      set({ authUser: null });
    } finally {
      set({ isAuthChecking: false });
    }
  },
}));

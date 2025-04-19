import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

interface signupInfoType {
  fullName: string;
  email: string;
  password: string;
}
interface useAuthStoreType {
  authUser: any;
  loading: boolean;
  isAuthChecking: boolean;
  checkAuth: () => void;
  setLoading: (value: boolean) => void;
  signUp: (data: signupInfoType) => void;
}

export const useAuthStore = create<useAuthStoreType>((set) => ({
  authUser: null,
  loading: false,
  isAuthChecking: false,
  setLoading: (value: boolean) => {
    set({ loading: value });
  },
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
  signUp: async (signUpData: signupInfoType) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/signup", signUpData);
      console.log("this response", response);
      set({ authUser: response.data.data });
      toast.success("Account created Successfully");
    } catch (error) {
      console.log("error in signing up the user", error);
      set({ loading: false });
      toast.error("Account creation failed");
    } finally {
      set({ loading: false });
    }
  },
}));

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

interface signupInfoType {
  fullName: string;
  email: string;
  password: string;
}
interface LoginInfoType {
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
  logOut: () => void;
  logIn: (loginData: LoginInfoType) => void;
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
      toast.success("Welcome Onboard!! Signed Up Successfully!!");
    } catch (error) {
      console.log("error in signing up the user", error);
      set({ loading: false });
      toast.error("Sign Up failed!!");
    } finally {
      set({ loading: false });
    }
  },
  logIn: async (logInData: LoginInfoType) => {
    try {
      const response = await axiosInstance.post("/login", logInData);
      console.log("Login Successfull");
      set({ authUser: response.data.data });
      toast.success("Welcome Back! You have Logged In Successfully!!");
    } catch (error) {
      console.log("Error in Login", error);
      toast.success("Login Failed!!");
    }
  },
  logOut: async () => {
    try {
      const response = await axiosInstance.post("/logout");
      set({ authUser: null });
      toast.success("Logout Successfully!!");
    } catch (error) {
      console.log("Error in Logout");
      toast.error("Logout Failed!!");
    }
  },
}));

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface signupInfoType {
  fullName: string;
  email: string;
  password: string;
}

interface LoginInfoType {
  email: string;
  password: string;
}
interface authUser {
  userid: string;
  profilePic: string;
  fullName: string;
  email: string;
  since: string;
}

interface useAuthStoreType {
  authUser: authUser | null;
  loading: boolean;
  isAuthChecking: boolean;
  isUpdatingProfile: boolean;
  checkAuth: () => void;
  setLoading: (value: boolean) => void;
  signUp: (data: signupInfoType) => void;
  logOut: () => void;
  logIn: (loginData: LoginInfoType) => void;
  updateProfile: (data: {
    profilePic?: ArrayBuffer | string | null;
    fullName?: string;
  }) => void;
}

export const useAuthStore = create<useAuthStoreType>((set) => ({
  authUser: null,
  loading: false,
  isAuthChecking: false,
  isUpdatingProfile: false,
  setLoading: (value: boolean) => {
    set({ loading: value });
  },

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/checkAuth");
      if (response.status !== 200) {
        set({ authUser: null });
      }
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
      toast.error("Sign Up failed!!");
    } finally {
      set({ loading: false });
    }
  },

  logIn: async (logInData: LoginInfoType) => {
    try {
      const response = await axiosInstance.post("/login", logInData);
      console.log("Login Successful");
      set({ authUser: response.data.data });
      toast.success("Welcome Back! You have Logged In Successfully!!");
    } catch (error) {
      console.log("Error in Login", error);
      toast.error("Login Failed!!");
    }
  },

  logOut: async () => {
    try {
      await axiosInstance.post("/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully!!");
    } catch (error) {
      console.log("Error in Logout");
      toast.error("Logout Failed!!");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/update/profile", data);
      const updatedUser = response.data?.userinfo;

      set({
        authUser: updatedUser,
      });
    } catch (error) {
      console.log("Error in updating profile", error);
      toast.error("Couldn't update the profile!");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));

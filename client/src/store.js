import { create } from "zustand";
import AxiosInstance from "./config/AxiosInstance";

const useStore = create((set) => ({
  isReloading: false,
  userLogin: false,
  isSpin: 0,
  showblogId: "6850518020d9d6e595910c3a",
  theme: "light",
  showLog: false,
  showThemes: false,
  user: null,
  eventNone: false,
  setEventNone: (i) => {
    set({ eventNone: i });
  },
  updateProfilePicture: (newUrl) =>
    set((state) => ({
      user: {
        ...state.user,
        profilePicture: newUrl,
      },
    })),
  resetUser: () => {
    set({ user: null });
  },

  setUser: async () => {
    try {
      const res = await AxiosInstance.get("user/");
      //   console.log(res);
      if (!res.data?.user) {
        // console.log("please login");

        return false;
      }
      //   console.log(res.data?.user);
      set({ user: res.data.user });
      return true;
    } catch (e) {
      return false;
    }
  },
  setShowThemes: (e) => {
    set({ showThemes: e });
  },
  setshowLog: (e) => {
    set({ showLog: e });
  },

  getTheme: () => {
    const local_theme = localStorage.getItem("bloggify-theme");
    if (local_theme) set({ theme: local_theme });
  },
  setTheme: (i) => {
    set({ theme: i });
    localStorage.setItem("bloggify-theme", i);
  },
  setLogin: (e) => {
    set({ userLogin: e });
  },
  setSpin: (e) => {
    set({ isSpin: e });
  },
  setShowBLog: (id) => {
    set({ showblogId: id });
  },
}));
export default useStore;

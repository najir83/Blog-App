import { create } from "zustand";
import AxiosInstance from "./config/AxiosInstance";

const useStore = create((set) => ({
  user: null,
  isReloading: false,
  userLogin: false,
  isSpin: true,
  showblogId: "6850518020d9d6e595910c3a",
  

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

import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useGroupData = create((set, get) => ({
  allGroupData: [],
  selectedGroup: null,
  isGroupDataLoading: false,

  createGroup: async (groupName) => {
    set({ isGroupDataLoading: true });
    try {
      const res = await axiosInstance.post("/group/create", { groupName });
      if (res.data.success) {
        get().getAllGroups();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGroupDataLoading: false });
    }
  },
  getAllGroups: async () => {
    set({ isGroupDataLoading: true });
    try {
      const res = await axiosInstance.get("/group/get-all-groups");
      set({ allGroupData: res.data.groups });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGroupDataLoading: false });
    }
  },
  removeFromGroup: async (id) => {
    set({ isGroupDataLoading: true });
    try {
      const res = await axiosInstance.get(`/group/remove/${id}`);
      if (res.data.success) {
        get().getGroups();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGroupDataLoading: false });
    }
  },

  setSelectedGroup: (selectedGroup) => {
    const socket = useAuthStore.getState().socket;
    set({ selectedGroup });
    socket.off("receiveGroupMessage");
    socket.off("newMemberJoin");
    socket.emit("joinRoom", {
      roomId: selectedGroup._id,
      userId: useAuthStore.getState().authUser._id,
    });
    socket.on("receiveGroupMessage", ({ response }) => {
      selectedGroup.groupMessages = response.groupMessages;
      set({
        selectedGroup: {
          ...selectedGroup,
          groupMessages: response.groupMessages,
        },
      });
      // set({ selectedGroup }); this will not call the useEffect, as react do shallow copy you are referring to the same variable
    });
    socket.on("newMemberJoin", ({ text }) => {
      toast.success(text);
    });
  },
}));

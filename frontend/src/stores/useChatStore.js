import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set,get)=>({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async() => {
        set({isUsersLoading:true});
        try{
            const res = await axiosInstance.get("/messages/users");
            set({users:res.data});
        }
        catch(error){
            toast("Error in fetching users: ",error.response.data.message);
        }
        finally{
            set({isUsersLoading:false});
        }
    },

    sendMessage: async(messageData) => {
        const { selectedUser , messages } = get();
        try{
            const res = axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]});
        }
        catch(error){
            toast.error("Error in sending message: ",error.response.data.message);
        }
    },

    getMessages: async(userId) => {
        set({isMessagesLoading:true});
        try{
            const res = axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        }
        catch(error){
            toast.error("Error in fetching messages: ",error.response.data.message);
        }
        finally{
            set({isMessagesLoading:false});
        }
    },

    setSelectedUser: (selectedUser)=>{Set({selectedUser})},
}))
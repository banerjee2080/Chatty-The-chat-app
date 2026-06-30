import useChatStore from "../stores/useChatStore.js"
import useAuthStore from "../stores/useAuthStore.js"
import { X } from "lucide-react";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    return (
    <div>
        <img
            src = {selectedUser.profilePic || '/avatar.png'}
            alt= {selectedUser.fullName}
         />
         <div>
            <h1>{selectedUser.fullName}</h1>
            <p>{onlineUsers.includes(selectedUser._id)?"online":"offline"}</p>
         </div>
         <button onClick={() => setSelectedUser(null)}>
            <X/>
         </button>
    </div>
  )
}

export default ChatHeader
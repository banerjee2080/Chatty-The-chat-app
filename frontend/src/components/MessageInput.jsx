import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react"
import toast from "react-hot-toast";
import useChatStore from "../stores/useChatStore.js"

const MessageInput = () => {
    const { sendMessage } = useChatStore();
    const [ text, setText ] = useState("");
    const [ imagePreview, setImagePreview ] = useState(null);
    const fileInputRef = useRef();

    const removeImage = ()=>{
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if(!file.type.startswith("image/")){
            toast.error("Please Select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = ()=>{
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
        await sendMessage({
            text: text.trim(),
            image: imagePreview,
        });

        // Clear form
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        } 
        catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
      <div>
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="preview" />
            <button type="button" onClick={removeImage}>
              <X />
            </button>
          </div>
        )}
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Enter your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button onClick={() => fileInputRef.current?.click()}>
            <Image />
          </button>
          <div>
            <button type="submit" disabled={!text.trim() && !imagePreview}>
              <Send />
            </button>
          </div>
        </form>
      </div>
    );
}

export default MessageInput
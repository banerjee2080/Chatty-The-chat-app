import { useState } from "react";
import useAuthStore from "../stores/useAuthStore.js"

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e)=>{
    const file = e.target.files[0];
    if(!file)return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Img =   reader.result;
      setSelectedImage(base64Img);
      await updateProfile({profilePic:base64Img});
    };
  };
  
  return (
    <div>
      <img
        src={authUser.profilePic || selectedImage || '/avatar.png'}
        alt="profile picture"
       />
       <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUpdatingProfile}
       />
       <p>
        {isUpdatingProfile?"Updating profile....":"upload profile Image"}
       </p>
       <p>Full Name</p>
       <p>{authUser.fullName}</p>

       <p>Email</p>
       <p>{authUser.email}</p>

       <p>Member Since</p>
       <p>{authUser.createdAt?.split("T")[0]}</p>

       <p>Account Status</p>
       <p>Active</p>
    </div>
  )
}

export default ProfilePage
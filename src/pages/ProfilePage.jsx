import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    gender: "",
    profilePictureUrl: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/api/User");
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error fetching profile data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      await axiosInstance.post("/api/User/uploadProfilePicture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchProfile();
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Error uploading profile picture.");
    }
  };

 
  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  
  const handleUpdateProfile = async () => {
    try {
      const { firstName, lastName, dateOfBirth, address, gender } = profile;
      await axiosInstance.put("/api/User", {
        firstName,
        lastName,
        dateOfBirth,
        address,
        gender,
      });
      toast.success("Profile updated!");
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <h1 className="text-black font-bold text-3xl mb-4">Profile</h1>

      
      <div className="bg-white bg-opacity-80 p-6 rounded shadow w-full max-w-md">
       
        <div className="flex flex-col items-center mb-6">
          {profile.profilePictureUrl ? (
            <img
              src={profile.profilePictureUrl}
              alt="Profile"
              className="w-32 h-32 object-cover rounded mb-2"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded mb-2">
              No Picture
            </div>
          )}
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <button
            onClick={handleUpload}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Upload Profile Picture
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full border px-3 py-2 rounded"
              value={profile.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="w-full border px-3 py-2 rounded"
              value={profile.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              className="w-full border px-3 py-2 rounded"
              value={profile.dateOfBirth ? profile.dateOfBirth.substring(0, 10) : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              className="w-full border px-3 py-2 rounded"
              value={profile.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Gender</label>
            <select
              name="gender"
              className="w-full border px-3 py-2 rounded"
              value={profile.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={handleUpdateProfile}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

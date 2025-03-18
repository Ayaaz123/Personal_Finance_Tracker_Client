import axiosInstance from "./axiosConfig";

export async function getProfile() {
  return axiosInstance.get("/api/User");
}

export async function updateProfile(profileData) {
  return axiosInstance.put("/api/User", profileData);
}

export async function uploadProfilePicture(file) {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/api/User/uploadProfilePicture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

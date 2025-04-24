import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import { Loader, Pencil } from "lucide-react";
// import avatar from "../../public/avatar.png";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [name, setName] = useState(authUser?.fullName);
  const [updateName, setUpdateName] = useState(false);
  console.log("auth user is", authUser);
  const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer | null>(
    null
  );
  console.log("profile pic", authUser?.profilePic);
  console.log("auth user is", authUser);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      console.log("base64 is ", base64Image);
      await updateProfile({ profilePic: base64Image });
      toast.success("Profile updated successfully!");
    };
  };

  return (
    <div className="h-screen pt-18">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative size-32">
              <img
                src={
                  (typeof selectedImg === "string" ? selectedImg : null) ||
                  authUser?.profilePic ||
                  "./avatar"
                }
                alt="Profile"
                className={`size-32 rounded-full object-cover border-4 transition-all duration-300 ${
                  isUpdatingProfile ? "blur-sm opacity-60" : ""
                }`}
              />

              {isUpdatingProfile && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader className="w-6 h-6 animate-spin text-white" />
                </div>
              )}

              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            {/* <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <input
                value={name}
                disabled={updateName ? true : false}
                className="px-4 py-2.5 w-full flex justify-between items-center bg-base-200 rounded-lg border"
              />
              <Pencil size={15} />
            </div> */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>

              <div className="relative w-full">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!updateName || isUpdatingProfile}
                  className="w-full px-4 pr-10 py-2.5 bg-base-200 rounded-lg border text-white placeholder:text-zinc-500 disabled:opacity-60"
                />
                {!updateName ? (
                  <Pencil
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400"
                    onClick={() => setUpdateName(true)}
                  />
                ) : (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-primary hover:underline"
                    onClick={async () => {
                      if (name!.trim() === "") {
                        toast.error("Name cannot be empty.");
                        return;
                      }
                      try {
                        await updateProfile({ fullName: name!.trim() });
                        toast.success("Name updated successfully.");
                        setUpdateName(false);
                      } catch (err) {
                        toast.error("Failed to update name.");
                      }
                    }}
                    disabled={isUpdatingProfile}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 w-full  justify-between items-center bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.since?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;

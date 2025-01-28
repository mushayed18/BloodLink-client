import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const { updateUserProfile, user, loading, setLoading } =
    useContext(AuthContext);
  const [upazilas, setUpazilas] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // Fetch districts and upazilas data using React Query
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const response = await axios.get("/districts.json");
      return response.data[2]?.data || [];
    },
  });

  const { data: upazilaData = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const response = await axios.get("/upazilas.json");
      return response.data[2]?.data || [];
    },
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://blood-link-server-five.vercel.app/users/${user?.email}`
        );
        setUserInfo(response.data);
      } catch (error) {
        {
        }
      }
    };

    fetchUserDetails();
  }, [user?.email]);

  const handleEditBtn = () => {
    setIsEditable((prev) => !prev);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    const filteredUpazilas = upazilaData.filter(
      (u) => u.district_id === selectedDistrictId
    );
    setUpazilas(filteredUpazilas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const photoFile = form.photo.files[0];
    const bloodGroup = form.bloodGroup.value;
    const districtId = form.district.value;
    const upazila = form.upazila.value;

    const districtObject = districts.find(
      (district) => district.id === districtId
    );
    const districtName = districtObject
      ? districtObject.name
      : userInfo.district;

    if (!districtName) {
      toast.error("Invalid district selected!");
      return;
    }

    let photoURL = userInfo.photo;

    try {
      setLoading(true);

      // Upload photo if a new photo is selected
      if (photoFile) {
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedTypes.includes(photoFile.type)) {
          toast.error("Only image files (JPEG, PNG, GIF, WebP) are allowed!");
          return;
        }

        const photoData = new FormData();
        photoData.append("image", photoFile);
        const uploadResponse = await axiosPublic.post(
          image_hosting_api,
          photoData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        photoURL = uploadResponse.data.data.url;
      }

      // Update user's Firebase profile
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL,
      });

      const updatedUserData = {
        name,
        email,
        photo: photoURL,
        bloodGroup,
        district: districtName,
        upazila,
      };

      await axios.put(
        `https://blood-link-server-five.vercel.app/users/${email}`,
        updatedUserData
      );

      toast.success("User profile updated successfully!");
      setUserInfo(updatedUserData);
      setIsEditable(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:ml-64 lg:w-3/4 p-6 md:rounded-r-lg shadow-2xl backdrop-blur-2xl dark:bg-white/30 bg-slate-200">
      <Helmet>
        <title>Profile | Blood Link</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-4xl py-10">Profile</h1>
        <button
          onClick={handleEditBtn}
          className="btn btn-sm text-white bg-red-900 rounded-none hover:bg-red-700"
        >
          {isEditable ? "Cancel" : "Edit"}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            defaultValue={userInfo?.name}
            name="name"
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
            required
            disabled={!isEditable}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            defaultValue={userInfo?.email}
            readOnly
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Photo</label>
          <div className="h-10 w-10 rounded-full">
            <img
              className="h-full w-full object-cover rounded-full"
              src={userInfo?.photo}
              alt="User"
            />
          </div>
          <input
            name="photo"
            type="file"
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
            disabled={!isEditable}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Blood Group: {userInfo.bloodGroup}
          </label>
          <select
            name="bloodGroup"
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
            disabled={!isEditable}
          >
            <option value={userInfo?.bloodGroup}>Update Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">
            District: {userInfo.district}
          </label>
          <select
            name="district"
            onChange={handleDistrictChange}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
            disabled={!isEditable}
          >
            <option value={userInfo?.district}>Update District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Upazila: {userInfo.upazila}
          </label>
          <select
            name="upazila"
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
            disabled={!isEditable}
          >
            <option value={userInfo?.upazila}>Update Upazila</option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>
        </div>

        {isEditable && (
          <button
            type="submit"
            className="rounded-none btn btn-sm text-white bg-red-900 hover:bg-red-900 w-full"
          >
            {/* {localLoading ? "Saving..." : "Save"} */}
            {loading ? "Saving..." : "Save"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;

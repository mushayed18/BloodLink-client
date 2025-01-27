import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);

  const [visibility, setVisibility] = useState(false);
  const [valid, setValid] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [upazilas, setUpazilas] = useState([]);
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

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

  const handleToggle = () => {
    setVisibility(!visibility);
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
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!photoFile) {
      toast.error("Please upload a photo!");
      return;
    }

    // Check if the uploaded file is an image
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(photoFile.type)) {
      toast.error("Only image files (JPEG, PNG, GIF, WebP) are allowed!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!regex.test(password)) {
      setValid(
        "Password must be at least 6 characters long, include at least one uppercase letter, and one lowercase letter."
      );
      return;
    }

    const districtObject = districts.find(
      (district) => district.id === districtId
    );
    const districtName = districtObject ? districtObject.name : "";

    if (!districtName) {
      toast.error("Invalid district selected!");
      return;
    }

    try {
      setLocalLoading(true);

      // Upload the photo to ImgBB
      const photoData = new FormData();
      photoData.append("image", photoFile);
      const uploadResponse = await axiosPublic.post(
        image_hosting_api,
        photoData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const photoURL = uploadResponse.data.data.url;

      // Create user with email and password
      const result = await createUser(email, password);
      const newUser = result.user;

      // Update the user's profile with the name and photo URL
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL,
      });

      setUser(newUser);

      const userData = {
        name,
        email,
        photo: photoURL,
        bloodGroup,
        district: districtName,
        upazila,
        role: "donor",
        status: "active",
      };

      // send the user to the database
      await axiosPublic.post("/register", userData);

      toast.success("User has been created successfully!", {
        style: {
          background: "white",
          color: "black",
        },
      });

      navigate("/");
    } catch (error) {
      toast.error("There was an error, please try again!", {
        style: {
          background: "white",
          color: "black",
        },
      });
    } finally {
      e.target.reset();
      setLocalLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeInDown flex flex-col md:flex-row justify-center w-11/12 mx-auto">
      <Helmet>
        <title>Register | Blood Link</title>
      </Helmet>
      <div className="bg-gradient-to-r from-red-900 to-red-700 md:w-2/5 lg:w-1/4 mt-28 md:mb-16 md:rounded-l-lg flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white py-4">Register now!</h1>
      </div>
      <div className="md:w-2/5 lg:w-1/4 p-6 md:rounded-r-lg shadow-2xl md:mt-28 mb-16 backdrop-blur-2xl dark:bg-white/30 bg-slate-200">
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Photo</label>
            <input
              name="photo"
              type="file"
              placeholder="Choose a photo"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Blood Group</label>
            <select
              name="bloodGroup"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              required
            >
              <option value="">Select Blood Group</option>
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
            <label className="block text-sm font-medium">District</label>
            <select
              name="district"
              onChange={handleDistrictChange}
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Upazila</label>
            <select
              name="upazila"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              required
            >
              <option value="">Select Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type={visibility ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              required
            />
            <button
              type="button"
              onClick={handleToggle}
              className="absolute top-9 right-[1rem]"
            >
              {visibility ? (
                <IoEyeOutline size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              required
            />
          </div>

          {valid && <div className="mt-2 text-red-900">{valid}</div>}

          <button
            type="submit"
            className="rounded-none btn btn-sm text-white bg-red-900 hover:bg-red-900 w-full"
          >
            {localLoading ? (
              <span className="flex items-center justify-center text-white cursor-not-allowed">
                Wait a moment...
                <span className="loading loading-spinner text-info"></span>
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <NavLink to="/login" className="text-red-900">
            Log in here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;

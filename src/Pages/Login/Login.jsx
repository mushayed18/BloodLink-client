import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const { signInUser, setUser, signInWithGoogle, loading, setLoading } =
    useContext(AuthContext);

  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setVisibility(!visibility);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const result = await signInUser(email, password);
      setUser(result.user);
      toast.success("Login successful!", {
        style: {
          background: "white",
          color: "black",
        },
      });
      navigate("/");
    } catch (error) {
      toast.error("There is an error. Please try again!", {
        style: {
          background: "white",
          color: "black",
        },
      });
    } finally {
      e.target.reset();
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 animate__animated animate__fadeInDown flex flex-col md:flex-row justify-center w-11/12 mx-auto">
      <div className="bg-gradient-to-r from-red-900 to-red-700 md:w-2/5 lg:w-1/4 mt-28 md:mb-16 md:rounded-l-lg flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white py-4">Login now!</h1>
      </div>
      <div className="md:w-2/5 lg:w-1/4 p-6 md:rounded-r-lg shadow-2xl md:mt-28 mb-16 backdrop-blur-2xl dark:bg-white/30 bg-slate-200">
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type={visibility ? "text" : "password"}
              id="password"
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

          <button
            type="submit"
            className={`btn btn-sm w-full bg-red-900 text-white border border-black rounded-none ${
              loading
                ? "cursor-not-allowed"
                : "hover:bg-red-900 hover:text-white"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center text-white">
                Logging in...
                <span className="loading loading-spinner text-info"></span>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          New to this website?{" "}
          <NavLink to="/register" className="text-red-900">
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import JoditEditor from "jodit-react";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        setIsLoading(true);
        const response = await axios.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setThumbnail(response.data.data.url);
      } catch (error) {
        toast.error("Image upload failed!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !thumbnail) {
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      setIsLoading(true);

      const blogData = {
        title,
        content,
        thumbnail,
        status: "draft",
      };

      await axios.post(
        "https://blood-link-server-five.vercel.app/blogs",
        blogData
      );

      toast.success("Blog created successfully!");
      navigate("/dashboard/content-management");
    } catch (error) {
      toast.error("Failed to create the blog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:ml-64 lg:p-6">
      <Helmet>
        <title>Create Blog | Blood Link</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Thumbnail Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
            required
          />
          {isLoading && <div className="mt-2">Uploading...</div>}
          {thumbnail && (
            <div className="mt-2">
              <img src={thumbnail} alt="Thumbnail" className="w-40" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Content</label>
          <JoditEditor value={content} onChange={setContent} />
        </div>

        <button
          type="submit"
          className="btn btn-sm rounded-none text-white bg-red-900 hover:bg-red-900 w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;

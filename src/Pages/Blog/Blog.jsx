import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BlogCard from "./BlogCard";
import Loading from "../../Components/Loading";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["publishedBlogs", currentPage],
    queryFn: async () => {
      const res = await axios.get(
        "https://blood-link-server-five.vercel.app/published-blogs",
        {
          params: { page: currentPage, limit },
        }
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Loading></Loading>;

  const totalPages = data.totalPages || 1;

  return (
    <div className="min-h-screen p-4 mt-28 md:px-9">
      <Helmet>
        <title>Blogs | Blood Link</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-6">Published Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {data.blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
        <span className="px-4 py-2 mx-1 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Blog;

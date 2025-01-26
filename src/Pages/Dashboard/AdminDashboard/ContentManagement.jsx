import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import BlogCard from "./BlogCard";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";

const ContentManagement = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs", { status: statusFilter, page: currentPage }],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/blogs`, {
        params: {
          status: statusFilter || undefined,
          page: currentPage,
          limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axios.put(`http://localhost:5000/blog-status/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog status updated");
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleStatusChange = (id, status) => {
    updateStatusMutation.mutate({ id, status });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/blogs/${id}`);
          queryClient.invalidateQueries(["blogs"]);
          toast.success("Blog deleted successfully");
        } catch (error) {
          toast.error("Failed to delete blog! please try again!");
        }
      }
    });
  };

  return (
    <div className="lg:ml-64 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <NavLink
          to={"/dashboard/content-management/add-blog"}
          className="btn bg-red-900 rounded-none hover:bg-red-700 text-white"
        >
          Add Blog
        </NavLink>
      </div>

      <div className="mb-4">
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {isLoading && <p>Loading blogs...</p>}
      {isError && <p>Failed to load blogs. Please try again later.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onStatusChange={handleStatusChange}
            onDelete={() => handleDelete(blog._id)}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center items-center">
        <button
          className="btn text-red-900"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <FaChevronLeft />
        </button>
        <span className="mx-4">
          Page {currentPage} of {data?.totalPages}
        </span>
        <button
          className="btn text-red-900"
          disabled={currentPage === data?.totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ContentManagement;

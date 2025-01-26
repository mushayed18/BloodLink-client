import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BlogCard from "./BlogCard";
import Loading from "../../Components/Loading";

const Blog = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/published-blogs", {
        params: { page: 1, limit: 6 },
      });
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Published Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blog;

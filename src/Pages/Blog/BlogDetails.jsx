import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://blood-link-server-five.vercel.app/blogs/${id}`
      );
      return res.data.blog;
    },
  });

  if (isLoading) return <div>Loading blog...</div>;
  if (isError) return <div>Failed to load blog. Please try again later.</div>;

  const { title, content, thumbnail } = data;

  return (
    <div className="min-h-screen p-4 mt-28">
      <Helmet>
        <title>Blog-details | Blood Link</title>
      </Helmet>
      <div className="max-w-2xl mx-auto border-2 p-6">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-96 object-cover mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} className="prose" />
      </div>
    </div>
  );
};

export default BlogDetails;

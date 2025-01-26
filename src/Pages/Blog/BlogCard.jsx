import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { _id, title, thumbnail, content } = blog;
  const navigate = useNavigate();

  const contentPreview = content.replace(/<[^>]+>/g, "").split(" ").slice(0, 20).join(" ") + "...";

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <img src={thumbnail} alt={title} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{contentPreview}</p>
        <button
          className="text-red-900 hover:underline"
          onClick={() => navigate(`/blog/${_id}`)}
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;

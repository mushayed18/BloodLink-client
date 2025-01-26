import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { _id, title, thumbnail } = blog;
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <button
          className="text-blue-500 hover:underline"
          onClick={() => navigate(`/blog/${_id}`)}
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;

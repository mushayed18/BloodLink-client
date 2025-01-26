import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, onStatusChange, onDelete }) => {
  const { _id, title, content, thumbnail, status } = blog;

  const contentPreview = content.replace(/<[^>]+>/g, "").split(" ").slice(0, 20).join(" ") + "...";

  const navigate = useNavigate();  

  const handleDetailsBtn = () => {
    navigate(`/blog/${_id}`)
  }

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col justify-between gap-4">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-700 mb-3">{contentPreview}</p>
      <div className="flex justify-between gap-2">
        <button onClick={() => onDelete(_id)} className="btn text-red-900">
          <MdDelete size={28} />
        </button>
        <button onClick={handleDetailsBtn} className="btn bg-red-900 text-white hover:bg-red-700">See Details</button>
        {status === "draft" ? (
          <button
            onClick={() => onStatusChange(_id, "published")}
            className="btn bg-red-900 text-white rounded-lg hover:bg-red-700"
          >
            Publish
          </button>
        ) : (
          <button
            onClick={() => onStatusChange(_id, "draft")}
            className="btn bg-none text-black border border-black rounded-lg hover:bg-red-700"
          >
            Unpublish
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogCard;

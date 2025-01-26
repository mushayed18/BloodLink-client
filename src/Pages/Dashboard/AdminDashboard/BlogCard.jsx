import { MdDelete } from "react-icons/md";

const BlogCard = ({ blog, onStatusChange, onDelete }) => {
  const { _id, title, content, thumbnail, status } = blog;

  const truncatedContent =
    content.replace(/(<([^>]+)>)/gi, "").slice(0, 100) + "...";

  return (
    <div className="border rounded-lg shadow p-4">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-700 mb-3">{truncatedContent}</p>
      <div className="flex justify-between gap-2">
        {status === "draft" ? (
          <button
            onClick={() => onStatusChange(_id, "published")}
            className="btn bg-red-900 text-white rounded-none hover:bg-red-700"
          >
            Publish
          </button>
        ) : (
          <button
            onClick={() => onStatusChange(_id, "draft")}
            className="btn bg-none text-black border border-black rounded-none hover:bg-red-700"
          >
            Unpublish
          </button>
        )}
        <button
          onClick={() => onDelete(_id)}
          className="btn text-red-900"
        >
          <MdDelete size={28} />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;

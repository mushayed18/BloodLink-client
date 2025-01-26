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
      <div className="flex gap-2">
        {status === "draft" ? (
          <button
            onClick={() => onStatusChange(_id, "published")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Publish
          </button>
        ) : (
          <button
            onClick={() => onStatusChange(_id, "draft")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Unpublish
          </button>
        )}
        <button
          onClick={() => onDelete(_id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;

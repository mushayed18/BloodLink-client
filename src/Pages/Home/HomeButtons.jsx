import { useNavigate } from "react-router-dom";

const HomeButtons = () => {
  const navigate = useNavigate();

  const handleSearchBtn = () => {
    navigate('/search-donor')
  }

  return (
    <div className="flex gap-3 mt-14">
      <button className="p-2 px-4 md:px-8 rounded-none bg-red-900 text-white hover:bg-none hover:border hover:border-white">
        Join as a donor
      </button>
      <button onClick={handleSearchBtn} className="p-2 px-4 md:px-8 rounded-none border border-white text-white hover:bg-red-900 hover:text-white">
        Search Donors
      </button>
    </div>
  );
};

export default HomeButtons;

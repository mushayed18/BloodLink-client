import { CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { MdDateRange, MdOutlineBloodtype } from "react-icons/md";
import { Link } from "react-router-dom";

const DonationCard = ({ request }) => {
  return (
    <div className="border-2 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        {request.recipientName} (Recipient)
      </h2>
      <div className="flex items-center gap-3">
        <span>
          <CiLocationOn />
        </span>
        <p className="text-gray-600">
          {request.recipientDistrict}, {request.recipientUpazila}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span>
          <MdOutlineBloodtype />
        </span>
        <p className="text-gray-600">Blood Group: {request.bloodGroup}</p>
      </div>

      <div className="flex items-center gap-3">
        <span>
          <MdDateRange />
        </span>
        <p className="text-gray-600">{request.donationDate}</p>
      </div>

      <div className="flex items-center gap-3">
        <span>
          <IoMdTime />
        </span>
        <p className="text-gray-600">{request.donationTime}</p>
      </div>

      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full">
                <img className="h-full w-full rounded-full" src={request.requesterImage} alt="Requester image" />
            </div>
            <p className="font-bold text-slate-500">{request.requesterName}</p>
        </div>
        <Link
          to={`/donation-request-details/${request._id}`}
          className="btn btn-sm bg-red-900 hover:bg-red-700 rounded-none text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DonationCard;

const DonorCard = ({ donor }) => {
    return (
      <div className="border-2 rounded-md p-6 flex items-center space-x-6">
        <img
          src={donor.photo}
          alt={donor.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">{donor.name}</h2>
          <p className="text-gray-600">{donor.email}</p>
          <p className="text-sm text-gray-500">Blood Group: {donor.bloodGroup}</p>
          <p className="text-sm text-gray-500">District: {donor.district}</p>
          <p className="text-sm text-gray-500">Upazila: {donor.upazila}</p>
        </div>
      </div>
    );
  };
  
  export default DonorCard;
  
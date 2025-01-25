import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DonorCard from "./DonorCard";
import { FiSearch } from "react-icons/fi";

const SearchDonor = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  // Fetch districts
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const response = await axios.get("/districts.json");
      return response.data[2]?.data || [];
    },
  });

  // Fetch upazilas
  const { data: upazilaData = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const response = await axios.get("/upazilas.json");
      return response.data[2]?.data || [];
    },
  });

  // Handle district change
  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;

    // Get the district name based on the selected ID
    const selectedDistrict = districts.find(
      (district) => district.id === selectedDistrictId
    )?.name;

    // Filter upazilas for the selected district
    const filteredUpazilas = upazilaData.filter(
      (u) => u.district_id === selectedDistrictId
    );
    setUpazilas(filteredUpazilas);

    setSearchCriteria({
      ...searchCriteria,
      district: selectedDistrict || "",
      upazila: "",
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };

  const {
    data: donors = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["donors", searchCriteria],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/donors", {
        params: {
          bloodGroup: searchCriteria.bloodGroup,
          district: searchCriteria.district,
          upazila: searchCriteria.upazila,
        },
      });

      if (response.data.success) {
        return response.data.donors;
      } else {
        throw new Error(response.data.message || "No donors found");
      }
    },
    enabled: false,
  });

  // Trigger a refetch when the form is submitted
  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="min-h-screen mt-28 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Search Donors</h1>
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-md rounded-md p-6 space-y-4"
      >
        <div className="md:flex justify-center gap-5 items-center">
          <div>
            <select
              name="bloodGroup"
              value={searchCriteria.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <select
              name="district"
              value={
                districts.find((d) => d.name === searchCriteria.district)?.id ||
                ""
              }
              onChange={handleDistrictChange}
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="upazila"
              value={searchCriteria.upazila}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
            >
              <option value="">Select Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-5 w-full md:w-auto md:mt-0 btn text-red-900"
          >
            <FiSearch />
          </button>
        </div>
      </form>

      {isFetching ? (
        <p className="text-center mt-6 text-2xl">Searching...</p>
      ) : donors.length > 0 ? (
        <div className="mt-6 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {donors.map((donor) => (
            <DonorCard key={donor._id} donor={donor} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-6 text-2xl font-bold">No donors found</p>
      )}
    </div>
  );
};

export default SearchDonor;

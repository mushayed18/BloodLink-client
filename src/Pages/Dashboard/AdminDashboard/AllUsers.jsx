import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Menu } from "@headlessui/react";
import Loading from "../../../Components/Loading";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch all users
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", { page: currentPage, status: filterStatus }],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/users", {
        params: { page: currentPage, limit: 6, status: filterStatus },
      });
      return response.data;
    },
  });

  // Handle updating user role or status
  const handleAction = async (userId, updates) => {
    try {
      console.log("Updating user:", userId, updates);
      const response = await axios.put(`http://localhost:5000/user/${userId}`, updates);
      if (response.data.success) {
        toast.success("User updated successfully!");
        refetch(); 
      } else {
        toast.error("Failed to update user! Please try again");
      }
    } catch (error) {
      toast.error("Failed to update user! Please try again");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen lg:ml-64 flex flex-col mt-8">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Users</h1>
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
      <div className="overflow-x-auto w-[390px] md:w-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-red-900 text-white">
              <th className="border px-4 py-2">Avatar</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full">
                    <img
                      src={user.photo || "/default-avatar.png"}
                      alt="avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.status}</td>
                <td className="border px-4 py-2">
                  <Menu as="div" className="relative">
                    <Menu.Button className="px-3 py-1 border rounded">
                      ⋮
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                      {user.status === "active" && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`block px-4 py-2 text-sm w-full text-left ${
                                active ? "bg-gray-100" : ""
                              }`}
                              onClick={() =>
                                handleAction(user._id, { status: "blocked" })
                              }
                            >
                              Block
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      {user.status === "blocked" && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`block px-4 py-2 text-sm w-full text-left ${
                                active ? "bg-gray-100" : ""
                              }`}
                              onClick={() =>
                                handleAction(user._id, { status: "active" })
                              }
                            >
                              Unblock
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      {user.role !== "volunteer" && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`block px-4 py-2 text-sm w-full text-left ${
                                active ? "bg-gray-100" : ""
                              }`}
                              onClick={() =>
                                handleAction(user._id, { role: "volunteer" })
                              }
                            >
                              Make Volunteer
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      {user.role !== "admin" && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`block px-4 py-2 text-sm w-full text-left ${
                                active ? "bg-gray-100" : ""
                              }`}
                              onClick={() =>
                                handleAction(user._id, { role: "admin" })
                              }
                            >
                              Make Admin
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      {user.role !== "donor" && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`block px-4 py-2 text-sm w-full text-left ${
                                active ? "bg-gray-100" : ""
                              }`}
                              onClick={() =>
                                handleAction(user._id, { role: "donor" })
                              }
                            >
                              Make Donor
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn px-4 py-2 border rounded disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <p>
          Page {currentPage} of {Math.ceil(data.total / 6)}
        </p>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * 6 >= data.total}
          className="btn px-4 py-2 border rounded disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AllUsers;

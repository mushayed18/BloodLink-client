import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../Providers/AuthProvider"

const MyDonationRequests = () => {
  const { user } = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [filter, setFilter] = useState("all")

  const {
    data: donationRequests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donationRequests", user.email, currentPage, filter],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/donation-requests/${user.email}`, {
        params: { page: currentPage, limit: itemsPerPage, filter },
      })
      return response.data
    },
  })

  const handleStatusChange = async (requestId, newStatus) => {
    // try {
    //   await axios.patch(`http://localhost:5000/donation-requests/${requestId}`, { status: newStatus })
    //   refetch()
    // } catch (error) {
    //   console.error("Error updating status:", error)
    // }
  }

  const handleDelete = async (requestId) => {
    // if (window.confirm("Are you sure you want to delete this donation request?")) {
    //   try {
    //     await axios.delete(`http://localhost:5000/donation-requests/${requestId}`)
    //     refetch()
    //   } catch (error) {
    //     console.error("Error deleting request:", error)
    //   }
    // }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const totalPages = Math.ceil(donationRequests.total / itemsPerPage)

  return (
    <div className="lg:ml-64 p-6">
      <h1 className="text-3xl font-bold mb-6">My Donation Requests</h1>

      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">
          Filter by status:
        </label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded p-1">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Recipient Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Date & Time</th>
              <th className="py-2 px-4 border-b">Blood Group</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {donationRequests.map((donation) => (
              <tr key={donation._id}>
                <td className="py-2 px-4 border-b">{donation.recipientName}</td>
                <td className="py-2 px-4 border-b">{`${donation.recipientDistrict}, ${donation.recipientUpazila}`}</td>
                <td className="py-2 px-4 border-b">
                  {formatDate(donation.donationDate)} at {donation.donationTime}
                </td>
                <td className="py-2 px-4 border-b">{donation.bloodGroup}</td>
                <td className="py-2 px-4 border-b">
                  {donation.donationStatus}
                  {donation.donationStatus === "inprogress" && (
                    <div className="mt-2 flex">
                      <button
                        onClick={() => handleStatusChange(donation._id, "done")}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleStatusChange(donation._id, "canceled")}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
                <td className="py-2 px-2 border-b">
                  <Link
                    to={``}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(donation._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Delete
                  </button>
                  <Link
                    to={``}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyDonationRequests


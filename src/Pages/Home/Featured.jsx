import React from "react";
import { FaHandsHelping, FaHeart, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Featured = () => {
    const navigate = useNavigate();

    const handleDonorBtn = () => {
        navigate('/blood-donation-requests')
    }

    return (
        <div className="bg-gray-50 py-12 px-6 lg:px-20">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
                    Making a Difference Together
                </h2>
                <p className="text-lg text-gray-600">
                    BloodLink connects generous donors with those in need. Here’s how we’re changing lives together.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Success Story 1 */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                    <FaHandsHelping className="text-red-900 text-6xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">500+ Lives Saved</h3>
                    <p className="text-gray-600">
                        Thanks to our incredible donors, over 500 lives have been saved through timely blood donations.
                    </p>
                </div>

                {/* Success Story 2 */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                    <FaHeart className="text-red-900 text-6xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Building Hope</h3>
                    <p className="text-gray-600">
                        Recipients have found hope and recovery thanks to the support of our BloodLink community.
                    </p>
                </div>

                {/* Success Story 3 */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                    <FaUsers className="text-red-900 text-6xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">A Growing Network</h3>
                    <p className="text-gray-600">
                        Our family of 1000+ donors and volunteers is growing daily, helping more people in need.
                    </p>
                </div>
            </div>

            {/* Call-to-Action */}
            <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Join us in making a difference today!
                </h3>
                <button onClick={handleDonorBtn} className="mt-6 px-6 py-3 bg-red-900 text-white rounded-none hover:bg-red-600 transition">
                    Become a Donor
                </button>
            </div>
        </div>
    );
};

export default Featured;

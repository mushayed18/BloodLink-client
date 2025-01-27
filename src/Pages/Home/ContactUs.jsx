import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-50 py-12 px-6 lg:px-20">
      <Helmet>
        <title>Home | Blood Link</title>
      </Helmet>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600">
          Have questions or need assistance? Reach out to us through the form
          below or give us a call.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Send Us a Message
          </h3>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 space-y-4 flex-grow"
          >
            <div>
              <label
                className="block text-gray-600 mb-2 font-medium"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                placeholder="Your Full Name"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-600 mb-2 font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                placeholder="Your Email Address"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-600 mb-2 font-medium"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="1"
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-900 text-white font-bold py-3 rounded-none hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Contact Information
          </h3>
          <div className="bg-white shadow-md rounded-lg p-6 flex-grow">
            <div className="h-full flex flex-col justify-center">
              <p className="text-lg text-gray-600 mb-4">
                We're here to help! Feel free to contact us directly.
              </p>
              <div className="text-gray-800">
                <p className="text-lg font-semibold mb-2">Call Us:</p>
                <p className="text-xl font-bold text-red-900">
                  +880 123-456-789
                </p>
              </div>
              <div className="mt-6">
                <p className="text-lg font-semibold mb-2">Address:</p>
                <p className="text-gray-600">
                  123 BloodLink Street, Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

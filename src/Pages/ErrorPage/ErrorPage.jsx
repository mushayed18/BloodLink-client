import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <Helmet>
        <title>Error | Blood Link</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-900 mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Oops! Page Not Found</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <button className="btn">Go Back Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

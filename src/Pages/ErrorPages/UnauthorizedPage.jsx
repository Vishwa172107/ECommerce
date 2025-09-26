import { Link } from "react-router-dom";

export const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-600 px-6 text-center">
      {/* Big Shh Emoji */}
      <div className="text-9xl mb-4">🤫</div>

      <h1 className="text-6xl font-bold text-red-500">401</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Unauthorized</h2>
      <p className="mt-2 text-gray-600">
        You don’t have permission to access this page.  
        Please log in with the right account or return to home.
      </p>

      <div className="mt-6 flex space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
          Go to Login
        </Link>
        <Link
          to="/"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};

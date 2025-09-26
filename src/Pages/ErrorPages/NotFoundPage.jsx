import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-600 px-6 text-center">
      {/* Big Ghost Emoji */}
      <div className="text-9xl mb-4">👻</div>

      <h1 className="text-6xl font-bold text-blue-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      <div className="mt-6">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

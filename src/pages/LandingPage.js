import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 text-gray-900">
      <div className="text-center max-w-xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Recipe Sorting
        </h1>
        
        <p className="text-lg text-gray-600 mb-12">
          Find the perfect recipe with ingredients you already have
        </p>
        
        <Link
          to="/function"
          className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Start cooking
        </Link>
        
        <p className="mt-8 text-sm text-gray-500">
          No account needed • Free to use
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
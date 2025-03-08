import React, { useState } from "react";
import { Link } from "react-router-dom";

const FunctionPage = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("https://recipe-project-backend-mejp.onrender.com/process-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredients.split(",").map(i => i.trim()) }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
  
      const data = await response.json();
      console.log("API Response:", data);
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to fetch recipes. Please try again.");
      setRecipes({});
    }
  
    setLoading(false);
  };

  // Helper function to format directions
  const formatDirections = (directions) => {
    if (!directions) return "No directions available";
    
    try {
      // Parse directions if it's a string representation of an array
      const parsedDirections = typeof directions === 'string' ? JSON.parse(directions.replace(/'/g, '"')) : directions;
      
      if (Array.isArray(parsedDirections)) {
        return parsedDirections.map((step, index) => (
          <li key={index} className="mb-1">{step}</li>
        ));
      } else {
        return "Directions format error";
      }
    } catch (error) {
      console.error("Error parsing directions:", error);
      return "Could not parse directions";
    }
  };

  // Helper function to format ingredients with amounts
  const formatIngredients = (ingredients) => {
    if (!ingredients) return "No ingredients available";
    
    try {
      if (Array.isArray(ingredients)) {
        return (
          <ul className="list-disc pl-5">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="mb-1">{ingredient}</li>
            ))}
          </ul>
        );
      } else {
        return "Ingredients format error";
      }
    } catch (error) {
      console.error("Error parsing ingredients:", error);
      return "Could not parse ingredients";
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-4 md:p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="text-gray-600 mb-4 hover:text-gray-900">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Find Recipes
          </h1>
          <p className="mt-2 text-gray-600 text-center">
            Enter ingredients you have available
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="relative">
            <input
              type="text"
              className="w-full p-4 border border-gray-200 rounded-lg text-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="chicken, onion, garlic..."
              value={ingredients}
              onChange={handleInputChange}
            />
          </div>

          <button
            onClick={fetchRecipes}
            disabled={loading || !ingredients.trim()}
            className="w-full mt-4 px-6 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Searching..." : "Find Recipes"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Results Section */}
        {Object.keys(recipes).length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h2 className="font-medium text-gray-700">Recipe Results</h2>
            </div>
            
            {Object.entries(recipes).map(([category, recipesInCategory]) => (
              recipesInCategory.length > 0 && (
                <div key={category} className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{category}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 bg-blue-100">
                      <thead>
                        <tr className="bg-blue-300 text-white">
                          <th className="border border-gray-300 px-4 py-2 text-left">Recipe Name</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Ingredients (With Amounts)</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Directions</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Steps</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Source</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recipesInCategory.map((recipe, index) => {
                          // Log each recipe to help with debugging
                          console.log(`Recipe ${index}:`, recipe);
                          
                          return (
                            <tr key={index} className="hover:bg-blue-200">
                              <td className="border border-gray-300 px-4 py-2">{recipe.title}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                {recipe.full_ingredients ? formatIngredients(recipe.full_ingredients) : (
                                  typeof recipe.NER === 'string' 
                                    ? recipe.NER.replace(/[\[\]"]/g, '') 
                                    : 'No ingredients information'
                                )}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                <ul className="list-disc pl-5">
                                  {recipe.directions && formatDirections(recipe.directions)}
                                </ul>
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{recipe.num_steps}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                {recipe.source && recipe.source !== "N/A" ? recipe.source : "N/A"}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {recipe.formatted_link ? (
                                  <a 
                                    href={recipe.formatted_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                  >
                                    View Recipe
                                  </a>
                                ) : recipe.link && recipe.link !== "N/A" ? (
                                  <a 
                                    href={`https://${recipe.link}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                  >
                                    View Recipe
                                  </a>
                                ) : (
                                  "N/A"
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && Object.keys(recipes).length === 0 && ingredients.trim() && !error && (
          <div className="mt-6 text-center text-gray-600">
            No recipes found. Try different ingredients.
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionPage;
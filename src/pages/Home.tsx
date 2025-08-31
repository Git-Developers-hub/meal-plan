import { useMemo, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import RecipeModal from "../components/RecipeModal";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/Error";

const Home = () => {
  const [query, setQuery] = useState("");
  const { data, loading, error } = useFetchRecipe(query);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  const [visibleCount, setVisibleCount] = useState(10);
  const itemsPerPage = 10;

  const visibleData = useMemo(
    () => data.slice(0, visibleCount),
    [data, visibleCount]
  );

  const handleSearch = (q: string) => {
    setQuery(q);
    setVisibleCount(itemsPerPage);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerPage);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && data.length === 0 && (
          <>
            {query === "" ? (
              <div className="flex flex-col items-center justify-center mt-24 space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-tr from-yellow-200 to-yellow-400 w-36 h-36 rounded-full flex items-center justify-center shadow-xl">
                  <svg
                    className="w-20 h-20 text-yellow-700 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L4.636 7.464"
                    />
                  </svg>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center drop-shadow-lg">
                  🍽️ Welcome to MealPlanner
                </h1>

                <p className="text-gray-600 text-center max-w-2xl text-lg sm:text-xl">
                  Discover, save, and plan your weekly meals with ease. Start by
                  typing your favorite dish above to explore delicious recipes
                  curated just for you.
                </p>

                <p className="text-gray-400 text-center italic">
                  Tip: Try searching "pasta", "chicken" or "soup".
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-20 space-y-4">
                <svg
                  className="w-24 h-24 mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 14l2-2 4 4m0 0l4-4m-4 4V4"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">
                  No recipes found
                </h2>
                <p className="text-gray-500 text-center max-w-xs">
                  We couldn't find any recipes for "{query}". Try searching with
                  a different keyword.
                </p>
              </div>
            )}
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {visibleData.map((r) => (
            <div
              key={r.idMeal}
              className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 cursor-pointer"
              onClick={() => setSelectedRecipe(r)}
            >
              <RecipeCard
                key={r.idMeal}
                recipe={r}
                onClick={() => setSelectedRecipe(r)}
              />
            </div>
          ))}
        </div>

        {visibleCount < data.length && !loading && !error && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default Home;

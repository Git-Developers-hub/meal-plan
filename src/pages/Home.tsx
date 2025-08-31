import { useMemo, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import RecipeModal from "../components/RecipeModal";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/Error";

const Home = () => {
  const [query, setQuery] = useState("soup");
  const { data, loading, error } = useFetchRecipe(query);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length]
  );
  const visibleData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage]);

  const handleSearch = (q: string) => {
    setQuery(q);
    setCurrentPage(1);
  };
  return (
    <div className="p-4 sm:p-6 md:p-6">
      <div className="mx-auto">
        <div className="flex justify-center mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && data.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20">
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
              No recipes found!
            </h2>
            <p className="text-gray-500 text-center max-w-xs">
              We couldn't find any recipes for "{query}". Try searching with a
              different keyword.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleData.map((r) => (
            <div
              key={r.idMeal}
              className="w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
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

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded cursor-pointer ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
            >
              Next
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

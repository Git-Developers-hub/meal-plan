import { useEffect, useState } from "react";

export const useFetchRecipe = (query: string) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        // const res = await fetch(
        //   `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=${
        //     import.meta.env.VITE_API_KEY
        //   }`
        // );
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const apiData = await res.json();
        setData(apiData.meals || []);
      } catch (err) {
        setError("Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);

  return { data, error, loading };
};

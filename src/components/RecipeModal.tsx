import { useEffect, useState } from "react";
import {
  useMealPlan,
  type MealKeys,
  type RecipeType,
} from "../context/MealPlanContext";

type Props = {
  recipe?: RecipeType;
  recipeId?: string | null;
  onClose: () => void;
};

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const meals: MealKeys[] = ["breakfast", "lunch", "dinner"];

const RecipeModal = ({ recipe: initialRecipe, recipeId, onClose }: Props) => {
  const [recipe, setRecipe] = useState<RecipeType | null>(
    initialRecipe || null
  );
  const [loading, setLoading] = useState(false);
  const { addToMealPlan } = useMealPlan();
  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedMeal, setSelectedMeal] = useState<MealKeys>("breakfast");

  useEffect(() => {
    if (!recipeId || initialRecipe) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const data = await res.json();
        setRecipe(data.meals ? data.meals[0] : null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [recipeId, initialRecipe]);

  if (!recipeId && !initialRecipe) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-black text-xl font-bold"
        >
          ✖
        </button>

        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : recipe ? (
          <div className="p-6">
            <h2 className="text-3xl font-extrabold mb-3 text-gray-800">
              {recipe.strMeal || recipe.title}
            </h2>

            <img
              src={recipe.strMealThumb || recipe.image}
              alt={recipe.strMeal || recipe.title}
              className="w-full h-64 object-cover rounded-xl shadow mb-4"
            />

            {(recipe.strCategory || recipe.strArea) && (
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                {recipe.strCategory && (
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    🍴 {recipe.strCategory}
                  </span>
                )}
                {recipe.strArea && (
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    🌍 {recipe.strArea}
                  </span>
                )}
              </div>
            )}

            {recipe.strIngredient1 && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2">Ingredients</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  {Array.from({ length: 20 }, (_, i) => {
                    const ingredient = recipe[`strIngredient${i + 1}`];
                    const measure = recipe[`strMeasure${i + 1}`];
                    return ingredient ? (
                      <li key={i} className="capitalize">
                        {ingredient}{" "}
                        <span className="text-gray-500">- {measure}</span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </>
            )}

            {recipe.strInstructions && (
              <>
                <h3 className="text-xl font-semibold mt-6 mb-2">
                  Instructions
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {recipe.strInstructions}
                </p>
              </>
            )}

            <div className="mt-6 flex flex-col gap-4 items-center">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="border rounded-lg px-4 py-2"
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={selectedMeal}
                onChange={(e) => setSelectedMeal(e.target.value as MealKeys)}
                className="border rounded-lg px-4 py-2"
              >
                {meals.map((meal) => (
                  <option key={meal} value={meal}>
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  addToMealPlan(selectedDay, selectedMeal, recipe);
                  onClose();
                }}
                className="bg-green-600 text-white px-6 py-3 cursor-pointer rounded-full hover:bg-green-700 transition shadow-md"
              >
                ➕ Add to{" "}
                {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} (
                {selectedMeal})
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">No details found.</div>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;

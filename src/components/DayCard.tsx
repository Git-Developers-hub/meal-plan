import { type MealKeys, type RecipeType } from "../context/MealPlanContext";

interface DayCardProps {
  day: string;
  meals: MealKeys[];
  mealPlan: Record<string, Record<MealKeys, RecipeType[]>>;
  onRemove: (day: string, meal: MealKeys, index: number) => void;
  onShowDetails: (recipe: RecipeType) => void;
}

const DayCard = ({
  day,
  meals,
  mealPlan,
  onRemove,
  onShowDetails,
}: DayCardProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4">
        <h2 className="capitalize text-xl font-bold text-white tracking-wide text-center">
          {day}
        </h2>
      </div>

      <div className="p-5">
        {meals.map((meal) => {
          const recipes = mealPlan[day][meal] || [];
          return (
            <div key={meal} className="mb-6">
              <h3 className="font-bold capitalize mb-2">{meal}</h3>
              {recipes.length ? (
                <ul className="space-y-4">
                  {recipes.map((recipe, i) => (
                    <li
                      key={i}
                      className="bg-gray-50 rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden"
                    >
                      <div className="relative">
                        {recipe.strMealThumb || recipe.image ? (
                          <img
                            src={recipe.strMealThumb || recipe.image}
                            alt={recipe.strMeal || recipe.title}
                            className="w-full h-40 object-cover"
                          />
                        ) : (
                          <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                        <div className="absolute bottom-0 w-full bg-black/50 text-white px-4 py-2 text-lg font-semibold">
                          {recipe.strMeal || recipe.title}
                        </div>
                      </div>

                      <div className="flex justify-between items-center px-4 py-3 bg-white">
                        <button
                          onClick={() => onShowDetails(recipe)}
                          className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:opacity-90 transition"
                        >
                          Show Details
                        </button>
                        <button
                          onClick={() => onRemove(day, meal, i)}
                          className="px-4 py-1.5 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow hover:opacity-90 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic text-center mt-2">
                  No {meal} planned
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayCard;

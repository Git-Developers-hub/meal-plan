import { useState } from "react";
import {
  useMealPlan,
  type MealKeys,
  type RecipeType,
} from "../context/MealPlanContext";
import RecipeModal from "./RecipeModal";
import DayCard from "./DayCard";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const MEALS: MealKeys[] = ["breakfast", "lunch", "dinner"];

const MealPlanner = () => {
  const { mealPlan, removeFromMealPlan } = useMealPlan();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

  const daysWithData = DAYS.filter((day) =>
    MEALS.some((meal) => mealPlan[day][meal]?.length > 0)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 drop-shadow">
        🍽️ Weekly Meal Planner
      </h1>

      {daysWithData.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">
          No meals planned yet! Start adding your meals to see them here.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {daysWithData.map((day) => (
            <DayCard
              key={day}
              day={day}
              meals={MEALS}
              mealPlan={mealPlan}
              onRemove={removeFromMealPlan}
              onShowDetails={setSelectedRecipe}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default MealPlanner;

import React, { createContext, useContext, useState, useEffect } from "react";

export type RecipeType = {
  idMeal?: string;
  strMeal?: string;
  strMealThumb?: string;
  strInstructions?: string;
  strCategory?: string;
  strArea?: string;
  id?: number;
  title?: string;
  image?: string;
  readyInMinutes?: number;
  description?: string;
  [key: `strIngredient${number}`]: string | undefined;
  [key: `strMeasure${number}`]: string | undefined;
};

export type MealKeys = "breakfast" | "lunch" | "dinner";

export type MealPlanType = {
  [day: string]: {
    breakfast: RecipeType[];
    lunch: RecipeType[];
    dinner: RecipeType[];
  };
};

export type ContextType = {
  mealPlan: MealPlanType;
  addToMealPlan: (day: string, meal: MealKeys, recipe: RecipeType) => void;
  removeFromMealPlan: (day: string, meal: MealKeys, index: number) => void;
};

const defaultMealPlan: MealPlanType = {
  monday: { breakfast: [], lunch: [], dinner: [] },
  tuesday: { breakfast: [], lunch: [], dinner: [] },
  wednesday: { breakfast: [], lunch: [], dinner: [] },
  thursday: { breakfast: [], lunch: [], dinner: [] },
  friday: { breakfast: [], lunch: [], dinner: [] },
  saturday: { breakfast: [], lunch: [], dinner: [] },
  sunday: { breakfast: [], lunch: [], dinner: [] },
};

const MealPlanContext = createContext<ContextType | null>(null);

export const MealPlanProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mealPlan, setMealPlan] = useState<MealPlanType>(() => {
    const saved = localStorage.getItem("mealPlan");
    if (saved) {
      try {
        const parsed: Partial<MealPlanType> = JSON.parse(saved);
        // Ensure all days and meals exist
        const safeMealPlan: MealPlanType = { ...defaultMealPlan };
        Object.keys(parsed).forEach((day) => {
          if (safeMealPlan[day]) {
            (["breakfast", "lunch", "dinner"] as MealKeys[]).forEach((meal) => {
              safeMealPlan[day][meal] = parsed[day]?.[meal] || [];
            });
          }
        });
        return safeMealPlan;
      } catch {
        return defaultMealPlan;
      }
    }
    return defaultMealPlan;
  });

  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  const addToMealPlan = (
    day: string,
    meal: MealKeys,
    recipe: RecipeType,
    replace = false
  ) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: replace ? [recipe] : [...prev[day][meal], recipe],
      },
    }));
  };

  const removeFromMealPlan = (day: string, meal: MealKeys, index: number) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: prev[day][meal].filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <MealPlanContext.Provider
      value={{ mealPlan, addToMealPlan, removeFromMealPlan }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = (): ContextType => {
  const ctx = useContext(MealPlanContext);
  if (!ctx) throw new Error("useMealPlan must be used within MealPlanProvider");
  return ctx;
};

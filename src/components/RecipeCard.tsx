import React from "react";

type Props = {
  recipe: any;
  onClick: (r: any) => void;
};

const RecipeCard: React.FC<Props> = ({ recipe, onClick }) => {
  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={() => onClick(recipe)}
    >
      <div className="relative w-full h-40">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      <div className="absolute bottom-0 p-3 w-full text-white">
        <h3 className="font-semibold text-lg drop-shadow">{recipe.strMeal}</h3>
        <p className="text-sm opacity-80">
          {recipe.strCategory} • {recipe.strArea}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;

── assets/            # Static assets (images, icons, logos, etc.)
   ── logo.png

── components/        # Reusable UI components
  ── common           # common folder for error and loader reusable components
    ── Error.tsx      # Show Error message display when api failed
    ── Loader.tsx     # Show Loading spinner when data is pending
  ── DayCard.tsx      # Card component for daily meal plan
  ── MealPlanner.tsx  # weekly meal plan layout
  ── Navbar.tsx       # Navigation bar for navigation
  ── RecipeCard.tsx   # For display recipe
  ── RecipeModal.tsx  # Modal for recipe details
  ── SearchBar.tsx    # Search input for recipes


── context/           # global state for adding/removing meals
  ── MealPlanContext.tsx

── hooks/             # custom hook for API fetch
  ── useFetchRecipe.ts

── pages/             # Route-level components
  ── Home.tsx         # Home page to showing recipe data

── App.tsx            # Root component
── index.css          # Global styles
── main.tsx           # App entry point
── vite-env.d.ts      # Vite TypeScript declarations

── .env               # Environment variables 
── .gitignore         # Ignored files for git
── eslint.config.js   # ESLint configuration
── index.html         # Main HTML template
── package-lock.json  # Dependency lock file
── package.json       # Project dependencies


1. Tailwindcss good for responsive design
2. lucide-react for icons
<<<<<<< HEAD
3. global state, avoids prop drilling
=======
3. global state, avoids prop drilling
>>>>>>> 8accd3b (Initial commit)

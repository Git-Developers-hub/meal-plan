import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loader from "./components/common/Loader";
const Home = lazy(() => import("./pages/Home"));
const MealPlanner = lazy(() => import("./components/MealPlanner"));

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<MealPlanner />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

import { Link, Route, Routes } from "react-router-dom";
import { CreateRecipePage } from "../pages/CreateRecipePage";
import { HomePage } from "../pages/HomePage";
import { MealPlannerPage } from "../pages/MealPlannerPage";

export function App() {
  return (
    <main style={{ fontFamily: "system-ui", margin: "2rem auto", maxWidth: 760 }}>
      <h1>Meal Recipe</h1>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/recipes/new">Create Recipe</Link>
        <Link to="/meal-planner">Meal Planner</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes/new" element={<CreateRecipePage />} />
        <Route path="/meal-planner" element={<MealPlannerPage />} />
      </Routes>
    </main>
  );
}

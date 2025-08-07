import React from 'react';
import './Form.css';
import Recipe from './Recipe.jsx';
import ChefLoader from './Loader.jsx';
import ResetButton from './ResetButton.jsx';

const Form = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const listofIngredients = ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  const handleSubmit = (formData) => {
    const newIngredient = formData.get("ingredient")?.trim();

    if (!newIngredient) {
      console.log("⚠️ Empty input ignored");
      return;
    }

    if (ingredients.includes(newIngredient.toLowerCase())) {
      console.log("⚠️ Duplicate ingredient:", newIngredient);
      return;
    }

    console.log("✅ Adding Ingredient:", newIngredient);
    setIngredients(prev => [...prev, newIngredient.toLowerCase()]);
  };

  const handleGenerateRecipe = async () => {
    console.log("👨‍🍳 Generating recipe for:", ingredients);
    setLoading(true);
    setRecipeShown(""); // Clear any previous recipe

   try {
  const response = await fetch("http://localhost:5000/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data = await response.text(); // assuming your API returns markdown as plain text
  console.log("📦 Recipe received");
  setRecipeShown(data);
} catch (error) {
  console.error("❌ Error generating recipe:", error);
} finally {
  setLoading(false);
}

  };

  const handleResetAll = () => {
    console.log("🔄 Resetting everything");
    setIngredients([]);
    setRecipeShown("");
    setLoading(false);
  };

  return (
    <main className="form-container">
      <form action={handleSubmit} className="input-form">
        <input
          type="text"
          name="ingredient"
          placeholder="Add Ingredients"
          aria-label="Add Ingredients"
        />
        <button type="submit" disabled={loading}>Add Ingredient</button>
      </form>

      <section className="ingredients-section">
        <h2>Ingredients List</h2>
        <ul>
          {listofIngredients.length > 0 ? listofIngredients : <li>No ingredients added yet</li>}
        </ul>

        {listofIngredients.length > 3 && !recipeShown && (
          <div className="get-recipe-container">
            <div>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={handleGenerateRecipe} disabled={loading}>
              {loading ? "Chef is working..." : "Get a Recipe"}
            </button>
          </div>
        )}

        <section className="recipe-output-section">
          {loading && <ChefLoader />}
          {!loading && recipeShown && (
            <>
              <Recipe recipe={recipeShown} />
              <ResetButton onReset={handleResetAll} />
            </>
          )}
        </section>
      </section>
    </main>
  );
};

export default Form;

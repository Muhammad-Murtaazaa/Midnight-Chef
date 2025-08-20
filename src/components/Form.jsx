// src/components/Form.jsx
import React from 'react';
import './Form.css';
import ReactMarkdown from 'react-markdown';
import ChefLoader from './Loader.jsx';
import ResetButton from './ResetButton.jsx';

function Recipe({ recipe }) {
  let content = recipe;

  // Try to parse if it's JSON (from backend)
  try {
    const json = JSON.parse(recipe);
    if (json.recipe) {
      content = json.recipe;
    }
  } catch {
    // if it's not JSON, fallback to plain markdown string
  }

  return (
    <div className="recipe-markdown">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

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
    setRecipeShown("");

    try {
      const response = await fetch("https://chef-backend-one.vercel.app/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recipe");
      }

      const data = await response.text();
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.target));
          e.target.reset();
        }}
        className="input-form"
      >
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

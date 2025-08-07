import React from 'react';
import './Form.css';
import Recipe from './Recipe.jsx';
import { getRecipeFromLlama3 } from './AI.js';

const Form = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState("");

  const listofIngredients = ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  const handleSubmit = (formData) => {
    const newIngredient = formData.get("ingredient");
    if (newIngredient) {
      setIngredients(prev => [...prev, newIngredient]);
      console.log("Added Ingredient:", newIngredient);
    } else {
      console.log("No ingredient entered");
    }
  };

  async function getRecipe() {
    console.log("Fetching recipe for ingredients:", ingredients);
    try {
      const recipeMarkdown = await getRecipeFromLlama3(ingredients);
      console.log("Received Recipe Markdown:", recipeMarkdown);
      setRecipeShown(recipeMarkdown);
    } catch (error) {
      console.error("Failed to get recipe:", error);
    }
  }

  return (
    <main>
      <form action={handleSubmit}>
        <input type="text" name="ingredient" placeholder="Add Ingredients" aria-label="Add Ingredients" />
        <button type="submit">Add Ingredient</button>
      </form>

      <section>
        <h2>Ingredients List</h2>
        <ul>
          {listofIngredients.length > 0 ? listofIngredients : <li>No ingredients added yet</li>}
        </ul>

        {listofIngredients.length > 3 && (
          <div className="get-recipe-container">
            <div>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={getRecipe}>Get a recipe</button>
          </div>
        )}

        <section>
          {recipeShown && <Recipe recipe={recipeShown} />}
        </section>
      </section>
    </main>
  );
};

export default Form;

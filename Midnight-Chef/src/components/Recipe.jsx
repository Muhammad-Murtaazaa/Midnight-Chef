import React, { useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import './Recipe.css';
const Recipe = ({ recipe }) => {
  useEffect(() => {
    console.log("Recipe component mounted with recipe:");
    console.log(recipe);
  }, [recipe]);

  return (
    <div className="recipe-output">
      <h2>Your Recipe</h2>
      <p>Here's a delicious recipe based on your ingredients:</p>
        <ReactMarkdown>{recipe}</ReactMarkdown>
    </div>
  );
};

export default Recipe;

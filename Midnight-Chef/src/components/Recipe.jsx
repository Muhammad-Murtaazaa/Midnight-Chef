import React, { useEffect } from 'react';
import { marked } from 'marked';

const Recipe = ({ recipe }) => {
  useEffect(() => {
    console.log("Recipe component mounted with recipe:");
    console.log(recipe);
  }, [recipe]);

  return (
    <div className="recipe-output">
      <h2>Your Recipe</h2>
      <div dangerouslySetInnerHTML={{ __html: marked.parse(recipe) }} />
    </div>
  );
};

export default Recipe;

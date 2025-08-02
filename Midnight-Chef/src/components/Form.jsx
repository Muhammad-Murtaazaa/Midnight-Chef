import React from 'react'
import './Form.css'
const Form = () => {

  const [ingredients, setIngredients] = React.useState([]);
  const listofIngredients = ingredients.map((ingredient, index) => {
    return <li key={index}>{ingredient}</li>
  });
  const handleSubmit = (formData) => {
    const newIngredient = formData.get("ingredient")
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
  }

  return (
    <main>
        <form action={handleSubmit}>
            <input type="text" name="ingredient" placeholder='Add Ingredients' aria-label='Add Ingredients' />
            <button type="submit">Add Ingredients</button>
            </form>
            <ul>
              {listofIngredients.length > 0 ? listofIngredients : <li>No ingredients added yet</li>}
            </ul>
    </main>
  )
}

export default Form
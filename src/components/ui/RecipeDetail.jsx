import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const APP_ID = '0dee56d0';
const APP_KEY = 'a4e7d8abaddcb89afd305071ce28e5b6';

const RecipeDetail = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`);
        console.log(response)
        setRecipe(response.data.recipe);
      } catch (error) {
        setError('Error fetching recipe details');
        console.error('Error fetching recipe details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{recipe.label}</h1>
      <img
        src={recipe.images.REGULAR.url}
        alt={recipe.label}
        className="w-full h-64 object-cover rounded-lg mt-4"
      />
      <p className="text-gray-700 mt-4">{recipe.source}</p>
      <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
      <ul className="list-disc list-inside mt-2">
        {recipe.ingredientLines.map((item, index) => (
          <li key={index} className="text-gray-800">{item}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-4">Instructions</h2>
      <p className="mt-2">{recipe.instructions || 'Instructions not available'}</p>
    </div>
  );
};

export default RecipeDetail;

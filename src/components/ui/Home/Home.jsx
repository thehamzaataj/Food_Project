import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import axios from 'axios';

const APP_ID = '0dee56d0';
const APP_KEY = '9e7ca7e8a4c3ec698ba3eac2406679a8';

function Home({ query, setSearchResults }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`https://api.edamam.com/search?q=${query || 'chai'}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const allRecipes = response.data.hits.map(hit => hit.recipe);
        setRecipes(allRecipes);
        setSearchResults(allRecipes.filter(recipe =>
          recipe.label.toLowerCase().includes(query.toLowerCase())
        ));
      } catch (error) {
        setError('Error fetching recipes');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query, setSearchResults]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <Card key={recipe.uri} recipe={recipe} />
        ))
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
}

export default Home;

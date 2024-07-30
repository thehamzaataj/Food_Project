import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ recipe }) => {
  const navigate = useNavigate();
  console.log(recipe)
  const handleViewDetails = () => {
    let text = recipe.uri;
    const myArray = text.split("/");
    const newArray = myArray[4].split("#")
    navigate(`/recipe/${newArray[1]}`); 
  };

  return (
    <div className="bg-white shadow-md rounded-lg max-w-sm m-4 cursor-pointer hover:shadow-lg">
      <img
        src={recipe.image}
        alt={recipe.label}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">{recipe.label}</h1>
        <p className="text-gray-700 mb-4">{recipe.source}</p>
        <h1 className='font-bold text-sm py-2 uppercase'>Ingredients</h1>
        <ul className="list-disc list-inside">
          {recipe.ingredientLines.map((item, index) => (
            <li key={index} className="text-gray-800">{item}</li>
          ))}
        </ul>
        <button 
          onClick={handleViewDetails}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;

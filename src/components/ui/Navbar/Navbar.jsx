import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Home from '../Home/Home';
import { Link } from 'react-router-dom';
const Navbar = ({ onSearch, searchResults }) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); 
    setShowResults(true);
  };

  const handleResultClick = (recipe) => {
    setQuery(recipe.label);
    setShowResults(false);
  };

  return (
    <div className='relative flex justify-between bg-white text-black px-6 py-5 items-center shadow-lg rounded-sm'>
      <div className='text-3xl font-bold cursor-pointer'>
        <Link to={'/'}><h1>FOOD RECIPE</h1></Link>
      </div>
      <div className='search text-black flex-grow max-w-md'>
        <Input 
          placeholder="Search for recipes"
          className="border rounded-l-md"
          value={query}
          onChange={handleInputChange}
        />
        {showResults && (
          <div className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg z-10 w-full max-w-md">
            {searchResults.length > 0 ? (
              searchResults.map((recipe) => (
                <div 
                  key={recipe.uri}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleResultClick(recipe)}
                >
                  <h5 className="text-sm font-bold">{recipe.label}</h5>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>
      <ul className='flex space-x-4'>
        <Link to={'/'}><Button variant="outline" className='flex-shrink-0'>Home</Button></Link>
        <Link to={'/contact-us'}><Button variant="outline" className='flex-shrink-0'>Contact Us</Button></Link>
        <Link to='/about-us'><Button variant="outline" className='flex-shrink-0'>About Us</Button></Link>
      </ul>
    </div>
  );
};

export default Navbar;

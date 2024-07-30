import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/ui/Navbar/Navbar';
import Home from './components/ui/Home/Home';
import RecipeDetail from './components/ui/RecipeDetail'; 
import ContactUs from './components/ui/ContactUs';
import About from './components/ui/About';

function App() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <Router>
      <div className='bg-slate-100'>
        <Navbar onSearch={handleSearchChange} searchResults={searchResults} />
        <Routes>
          <Route 
            path="/" 
            element={<Home query={query} setSearchResults={setSearchResults} />} 
          />
          <Route 
            path="/recipe/:id" 
            element={<RecipeDetail />} 
          />
          <Route
            path='/contact-us'
            element={<ContactUs />}
          />
          <Route
            path='/about-us'
            element={<About />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

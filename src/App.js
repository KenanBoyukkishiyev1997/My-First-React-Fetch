import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "43f1ec19";
  const APP_KEY = "8fd3740b75e97036b4f33015282ddd90";

  const [resepices, setResepices] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getResepy();
  }, [query]);

  const getResepy = async () => {
    const responst = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await responst.json();

    setResepices(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();

    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="serch-form">
        <input
          className="serch-bar"
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder='write some food'
        />
        <button className="serch-btn" type="submit">
          Serch
        </button>
      </form>

      <div className='recipes'>
        {resepices.map((resepice) => (
          <Recipe
            key={resepice.recipe.label}
            title={resepice.recipe.label}
            calories={resepice.recipe.calories}
            image={resepice.recipe.image}
            ingredients={resepice.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

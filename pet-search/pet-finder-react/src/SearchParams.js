import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import axios from "axios";
import useDropdown from "./UseDropdown";

import Results from "./Results";
import ThemeContext from "./ThemeContext";

function SearchParams() {
  // eslint-disable-next-line
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const animals = await axios.get(`http://localhost:9888/api/v1/pets/1`);
    console.log('data from local API-', animals);
    setPets(animals || []);
  }

  useEffect(() => {
    // clear the list breeds if there are any
    setBreeds([]);

    // clear the breed name if there is any
    setBreed("");

    // get the breeds list from api
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    });
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            placeholder="Location"
            // onChange={e => setLocation(e.target.value)}
            readOnly
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            name="theme"
            id="theme"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="pink">Pink</option>
            <option value="skyblue">Sky Blue</option>
          </select>
        </label>
        <button type="submit" style={{ backgroundColor: theme }}>
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;

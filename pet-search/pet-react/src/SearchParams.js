import React, { useState, useEffect, useContext } from "react";
import pet from "@frontendmasters/pet";

import useDropdown from "./UseDropdown";

import Results from "./Results";
import ThemeContext from "./ThemeContext";

function SearchParams() {
  // eslint-disable-next-line
  const [location, setLocation] = useState(""); //Seattle, WA
  const [petage, setAge] = useState(0);
  const [temperament, setTemperament] = useState("");
  const [redius, setRedius] = useState(0);
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ["barnyard", "bird", "cat", "dog", "horse"]);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      age: petage,
      temperament,
      redius,
      breed,
      type: animal
    });
    // const animals = await axios.get(`http://localhost:9888/api/v1/pets/1`);
    // console.log('data from local API-', animals); 
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
        Shelter Location
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            placeholder="Shelter Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="redius">
          Distance from current Location(Miles)
          <input
            type="number"
            name="redius"
            id="redius"
            value={redius}
            placeholder="Age"
            onChange={e => setRedius(e.target.value)}
          />
        </label>
        <label htmlFor="age">
          Pet Age
          <input
            type="number"
            name="petage"
            id="petage"
            value={petage}
            placeholder="Age"
            onChange={e => setAge(e.target.value)}
          />
        </label>
        <label htmlFor="temperament">
          Temperament
          <input
            type="text"
            name="temperament"
            id="temperament"
            value={temperament}
            placeholder="Temperament"
            onChange={e => setTemperament(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button type="submit">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;

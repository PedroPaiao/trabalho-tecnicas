import { useState, useEffect } from "react";
import axiosClient from "../services/axios";

export default function Card(props) {
  const [pokemon, setPokemon] = useState(null);
  const getData = async () => {
    const response = await axiosClient.get(props.pokemonUrl);
    setPokemon(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  if (pokemon) {
    return (
      <>
        <div className="card" style={{ width: '300px', backgroundColor: '#FFCC00' }}>
          <img src={pokemon.sprites.front_shiny} className="img-thumbnail" alt={pokemon.name} />
          <div className="card-body">
            <h2>{pokemon.name}</h2>
            <p className="card-text">
              <a href={`/${pokemon.name}`} className="btn btn-primary">
                Conhecer mais
              </a>
            </p>
          </div>
        </div>
      </>
    );
  } else {
    <p>Loading...</p>;
  }
}

import Head from "next/head";
import React, { useState, useEffect } from "react";
import Card from "../components/card";
import axiosClient from "../services/axios";


export default function Home() {
  const [pokemon, setPokemon] = useState(null);

  const getData = async () => {
    const response = await axiosClient.get('/pokemon' + window.location.pathname);
    setPokemon(response.data);
    console.log(response.data)
  };

  useEffect(() => {
    getData();
  }, []);

  if(pokemon) {
    return (
      <>
        <Head>
          <meta
            name="description"
            content="Pokedex para trabalho Tecnicas Avançadas"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
          <div className="card d-flex">
            <img src={pokemon.sprites.front_default} className="card-img-top"  style={{ height: "400px" }} alt={pokemon.name} />
            <div className="card-body">
              <h5 className="card-title">{pokemon.name}</h5>
              <p className="card-text">Peso: {pokemon.weight}</p>
              <a href="/" className="btn btn-primary">Voltar</a>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    <h1>Loading...</h1>
  }
}

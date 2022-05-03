import Head from "next/head";
import React, { useState, useEffect } from "react";
import Card from "../components/card";
import axiosClient from "../services/axios";

export default function Home() {
  const [pokemons, setPokemons] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState("/pokemon");
  const [prevUrlPage, setPrevUrlPage] = useState(null);

  const getDataNext = async () => {
    const response = await axiosClient.get(nextPageUrl);
    setPokemons(response.data.results);
    if (response.data.next) {
      setNextPageUrl(response.data.next);
    }
    setPrevUrlPage(response.data.previous);
  };

  const getDataPrev = async () => {
    const response = await axiosClient.get(prevUrlPage);
    setPokemons(response.data.results);
    if (response.data.next) {
      setNextPageUrl(response.data.next);
    }
    setPrevUrlPage(response.data.previous);
  };

  useEffect(() => {
    getDataNext();
  }, []);

  if (pokemons) {
    return (
      <div className="container-fluid bg-primary">
        <Head>
          <meta
            name="description"
            content="Pokedex para trabalho Tecnicas Avançadas"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mt-2">
          <div className="justify-content-center d-flex align-items-center">
            <img src="/pokemon-logo-png.png" style={{ height: "100px" }}></img>
            <h1 className="text-center">Bem vindo a minha Pokedex</h1>
          </div>

          <section if="pokemons" className="card m-4 p-4">
            <div className="row card-body">
              {pokemons.map((element) => {
                return (
                  <div className="mt-2 col-md-3" key={element.url}>
                    <Card pokemonUrl={element.url}></Card>
                  </div>
                );
              })}
            </div>

            <section className="container d-flex justify-content-around">
              {prevUrlPage ? (
                <button onClick={getDataPrev} className="btn btn-secondary">
                  Pagina anterior
                </button>
              ) : null}

              <button onClick={getDataNext} className="btn btn-secondary">
                Proxima pagina
              </button>
            </section>
          </section>
        </main>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

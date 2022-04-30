import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Card from '../components/card';
import axiosClient from '../services/axios'

export default function Home(props) {
  const [pokemons, setPokemons] = useState(null)
  const getData = async () => {
      const response = await axiosClient.get(`/pokemon`);
      setPokemons(response.data.results);
  };
  useEffect(() => {
      getData();
    }, []);

    if(pokemons) {
      return (
        <div className='container'>
          <Head>
            <meta name="description" content="Pokedex para trabalho Tecnicas Avançadas" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className='container mt-2'>
            <h1 className='text-large text-center'>
              Bem vindo a minha Pokedex
            </h1>
    
            <div className='container'>
                { 
                  pokemons.map(element => {
                    return <div className='mt-2' key={element.url} >
                      <Card pokemonUrl={element.url}></Card>
                    </div>
                  })
                }
            </div>
          </main>
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }
}
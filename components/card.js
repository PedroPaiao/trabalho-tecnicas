import { useState, useEffect } from "react";
import axiosClient from "../services/axios";

export default function Card(props) {
    const [pokemon, setPokemon] = useState(null)
    const getData = async () => {
        const response = await axiosClient.get(props.pokemonUrl);
        setPokemon(response.data);
    };
    useEffect(() => {
        getData();
      }, []);
    
    if(pokemon) {
        return <>
            <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                <img src={pokemon.sprites.front_shiny} class="img-thumbnail rounded-start h-auto" alt="..."/>
                </div>
                <div class="col-md-8">
                <div className="card-body">
                <h4 className="card-title">{pokemon.name}</h4>
                <div className="card-text">{
                        pokemon?.abilities.map(element => {
                            return <p key={element.ability.name}>{element.ability.name}</p>
                        })
                    }
                </div>
                <a href="#" className="btn btn-primary">Ver mais sobre</a>
                </div>
                </div>
                </div>
            </div>
        </>
    } else {
        <p>Loading...</p>
    }
}


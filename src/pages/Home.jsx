import axios from "axios";
import { Container, Grid } from "@mui/material";
import React from "react";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/pokemonCard";
import { useEffect } from "react";
import { useState } from "react";


export default function Home(){
    const [pokemons, setPokemons] = useState([]);

    useEffect(() =>{
        getPokemon();
    },[]);

    function getPokemon(){
        const endpoints = [];

        for(var i=1; i<=50; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        console.log(endpoints);

        const response = axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then((res) => setPokemons(res))
        .catch((error) => console.log(error));
        console.log(response)

       /* axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")
        .then((resposta) => setPokemons(resposta.data.results))
        .catch((error) => console.log(error));*/

    }
     
    return(
      <>
        <NavBar />
             <Container width='xl'>
                 <Grid container spacing={15}>
                     { pokemons.map((pokemon ,key) => (
                     <Grid item xs={3} key={key}>
                     <PokemonCard name={pokemon.data.name} img={pokemon.data.sprites.front_default} />
                     </Grid>
                     ))}
                 </Grid>   
             </Container>
      </>
    );
}
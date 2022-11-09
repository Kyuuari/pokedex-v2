import React, { useEffect } from "react";
import { GetStaticProps } from "next";

type Props = {};

// interface results {
//   name: string;
//   url: string;
// }

const URL = "https://pokeapi.co/api/v2/pokemon?limit=5";

const PokemonList = ({ pokemon }: any) => {
  console.log(pokemon);
  useEffect(() => {
    // async function getPokemonData() {
    //   const res = await fetch(URL);
    //   const { results } = res.json();
    // }

    return () => {};
  }, []);

  return <div>PokemonList</div>;
};

export default PokemonList;

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(URL);
//   const { results } = await res.json();
//   const pokemon = results.map((pokeman: any, index: any) => {
//     const paddedId = ("00" + (index + 1)).slice(-3);
//     // const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
//     return { ...pokeman };
//   });
//   return {
//     props: { pokemon },
//   };
// };

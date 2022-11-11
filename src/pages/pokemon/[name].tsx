import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React from "react";

const URL = "https://pokeapi.co/api/v2/pokemon?limit=8";
// const URL_Pokemon = "https://pokeapi.co/api/v2/pokemon/";

const MAX_BASE_STAT = 255;

interface PokemonItem {
  name: string;
  url: string;
}

interface PokemonList {
  pokemon: PokemonItem[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch(URL);
  const { results } = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = results.map((pokemon: PokemonItem) => ({
    params: { url: pokemon.url, name: pokemon.name },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //   const linkdata = params?.url;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params?.name}`);
  const data = await res.json();

  return {
    props: { pokemoninfo: data },
  };
};

const PokemonInfo = ({ pokemoninfo }: any) => {
  console.log(pokemoninfo);
  return (
    <div className="grid h-screen w-screen place-content-center p-20">
      <div className="">
        <h3>{pokemoninfo.name}</h3>
        <Image
          alt="pokemon sprite"
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${pokemoninfo.id}.png`}
          width={200}
          height={200}
        />

        <p>No. {pokemoninfo.id}</p>
        {pokemoninfo.stats.map(
          ({ base_stat, stat, sprites }: any, index: number) => {
            return (
              <div key={index}>
                <p>{stat.name}</p>
                <progress
                  className="progress w-56"
                  value={base_stat}
                  max={MAX_BASE_STAT}
                ></progress>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default PokemonInfo;

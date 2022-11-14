import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React from "react";
import { a, SpringValue, to, useSpring } from "react-spring";
import { URL } from "../../components/ExternalData";
import TypeTag from "../../components/TypeTag";

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
  const props = useSpring({ value: 0 });
  return (
    <div className="grid h-screen w-screen place-content-center p-20">
      <div className="">
        <Image
          alt="pokemon sprite"
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(
            "00" + pokemoninfo.id
          ).slice(-3)}.png`}
          width={200}
          height={200}
        />
        <h2>{pokemoninfo.name}</h2>

        <p>No. {pokemoninfo.id}</p>

        {pokemoninfo.types.map(({ type }: any, index: number) => {
          return (
            <div>
              {/* <p>{type.name}</p> */}
              <TypeTag poketype={type.name} />
            </div>
          );
        })}
        {pokemoninfo.stats.map(
          ({ base_stat, stat, sprites }: any, index: number) => {
            return (
              <div key={index}>
                <p>{stat.name}</p>
                <a.progress
                  className="progress w-56"
                  value={
                    useSpring({ from: { value: 0 }, to: { value: base_stat } })
                      .value
                  }
                  max={MAX_BASE_STAT}
                ></a.progress>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default PokemonInfo;

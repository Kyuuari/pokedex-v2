import { GetStaticPaths, GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const URL = "https://pokeapi.co/api/v2/pokemon?limit=8";

interface PokemonItem {
  name: string;
  url: string;
  image: string;
}

interface PokemonList {
  pokemon: PokemonItem[];
}

const Home: NextPage<PokemonList> = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid h-full w-full place-content-center">
        <h1>Pokemon List</h1>

        <div className="grid gap-2 md:grid-cols-4 lg:grid-cols-6">
          {pokemon.map(({ name, url, image }, index) => {
            return (
              <Link
                href={`/pokemon/` + name}
                key={index}
                className="grid h-[20rem] w-[10rem] place-content-center rounded bg-slate-100"
              >
                <Image
                  alt="pokemon image"
                  src={image}
                  width={500}
                  height={500}
                />
                <h3 className="text-center">{name}</h3>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(URL);
  const { results } = await res.json();
  const pokemon: PokemonItem[] = results.map((pokeman: any, index: number) => {
    const paddedId = ("00" + (index + 1)).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return { ...pokeman, image };
  });
  return {
    props: { pokemon },
  };
};

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  name,
  description,
  documentation,
}) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <Link
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </Link>
    </section>
  );
};

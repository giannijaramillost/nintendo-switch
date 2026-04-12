import { useEffect, useState } from 'react';
import './App.css';
import LeftControl from './components/LeftControl';
import RightControl from './components/RightControl';
import Screen from './components/Screen';
import useFetch from './hooks/useFetch';
import GameScreen from './components/GameScreen';
import PokemonDetails from './components/PokemonDetails';
import VSScreen from './components/VS-Screen';

function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  const { data, loading, error } = useFetch(url);

  const [pokemones, setPokemones] = useState([]);


  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  const computerSelection = () => {
    const rnd = getRandomInt(0, pokemones.length);
    const pc = pokemones.filter((p) => p.id === rnd);
    setComputerPokemon(pc);
  }


  // Función para manejar la dirección del D-Pad
  const [position, setPosition] = useState(1);
  const [myPokeSelection, setMyPokemon] = useState([]);
  const [computerPokeSelection, setComputerPokemon] = useState([]);
  const handleDirection = (direction) => {
    if (direction === 'right') {
      const newPos = position + 1;
      if (newPos <= 100) setPosition(newPos);
    } else if (direction === 'left') {
      const newPos = position - 1;
      if (newPos >= 1) setPosition(newPos);
    } else if (direction === 'up') {
      const newPos = position - 5;
      if (newPos >= 1) setPosition(newPos);
    } else if (direction === 'down') {
      const newPos = position + 5;
      if (newPos <= 100) setPosition(newPos);
    }
  }

  const handleSelection = () => {
    const selectPokemon = pokemones.filter((p) => p.id === position);
    setMyPokemon(selectPokemon);
    computerSelection();
  }

   const getListPokemones = () => {
      const list = data?.results?.filter((p) => p.url);
      const plist = list?.map((l) => fetch(l.url).then((res) => res.json()));

      Promise.all(plist).then((values) => {
        const saniData = values?.map((e) => {
          return {
            name: e.name,
            id: e.id,
            types: e.types,
            moves: e.moves.map((e) => {
              return {
                ...e,
                attack: getRandomInt(20, 98),
              };
            }),
            sprites: e.sprites,
          };
        });

        setPokemones(saniData);
      });
    };

  useEffect(() => {
    getListPokemones();
  }, [data]);

  
  const [showVSScreen, setShowVSScreen] = useState(false);

  useEffect(() => {
    if (myPokeSelection.length && computerPokeSelection.length) {
      setShowVSScreen(true);
      const timer = setTimeout(() => {
        setShowVSScreen(false);
      }, 3000); // Mostrar VS Screen por 3 segundos

      return () => clearTimeout(timer);
    }
  }, [myPokeSelection, computerPokeSelection]);


  return (
    <div className="flex justify-center pt-10 min-h-screen bg-gray-300">
      <LeftControl handleDirection={handleDirection} />
      <div className="flex flex-col items-center max-w-2xl w-full">
        {myPokeSelection.length && computerPokeSelection.length ? (
          showVSScreen ? (
            <VSScreen myPokemon={myPokeSelection} computerPokemon={computerPokeSelection} />
          ) : (
            <GameScreen myPokemon={myPokeSelection} computerPokemon={computerPokeSelection} />
          )
        ) : (
          <>
            <Screen pokemones={pokemones} position={position} />
            <PokemonDetails actual={pokemones.filter((p) => p.id === position)} />
          </>
        )}
      </div>
      <RightControl handleDirection={handleDirection} handleSelection={handleSelection} />
    </div>
  );
}

export default App;
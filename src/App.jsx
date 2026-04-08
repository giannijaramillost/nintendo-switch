import { useEffect, useState } from 'react';
import './App.css';
import LeftControl from './components/LeftControl';
import RightControl from './components/RightControl';
import Screen from './components/Screen';
import useFetch from './hooks/useFetch';
import GameScreen from './components/GameScreen';

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
      const newPos = position - 4;
      if (newPos >= 1) setPosition(newPos);
    } else if (direction === 'down') {
      const newPos = position + 4;
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
          moves: e.moves.map((e) => {
            return {
              ...e,
              attack: getRandomInt(1, 400),
            };
          }),
          sprites: e.sprites,
        };
      });

      console.log({ saniData });
      setPokemones(values);
    });
  };

  useEffect(() => {
    getListPokemones();
  }, [data]);


  return (
    <div className="flex justify-center pt-10">
      <LeftControl handleDirection={handleDirection} />
      {myPokeSelection.length && computerPokeSelection.length ? (
        <GameScreen myPokemon={myPokeSelection} computerPokemon={computerPokeSelection} />
      ) : (
        <Screen pokemones={pokemones} position={position} />
      )}
      <RightControl handleDirection={handleDirection} handleSelection={handleSelection} />    </div>
  );
}

export default App;
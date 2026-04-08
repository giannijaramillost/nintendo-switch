import React from 'react'

function GameScreen({ myPokemon, computerPokemon }) {
  return (
    <div className="w-[450px] h-81 flex flex-col items-center justify-center gap-8 border-4 border-solid bg-gray-900">
      <h1 className="text-white text-2xl font-bold">¡BATALLA POKEMON!</h1>
      
      <div className="flex justify-between items-center w-full px-8">
        {/* Pokemon del Usuario */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-white text-lg">Gianni's Pokemon</h2>
          <div className="bg-red-600 p-4 rounded-lg">
            <img 
              src={myPokemon[0]?.sprites?.front_default} 
              alt={myPokemon[0]?.name}
              className="w-32 h-32"
            />
          </div>
          <p className="text-white font-bold capitalize">{myPokemon[0]?.name}</p>
        </div>

        {/* VS */}
        <div className="text-white text-3xl font-bold">VS</div>

        {/* Pokemon de la PC */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-white text-lg">IA</h2>
          <div className="bg-blue-600 p-4 rounded-lg">
            <img 
              src={computerPokemon[0]?.sprites?.front_default} 
              alt={computerPokemon[0]?.name}
              className="w-32 h-32"
            />
          </div>
          <p className="text-white font-bold capitalize">{computerPokemon[0]?.name}</p>
        </div>
      </div>
    </div>
  )
}

export default GameScreen
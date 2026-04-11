import React from 'react'

function GameScreen({ myPokemon, computerPokemon }) {
  return (
    <div className="w-[42rem] h-96 overflow-y-auto border-8 border-black bg-gray-800">
      <h1 className="text-white text-4xl font-bold text-center py-4">¡BATALLA POKEMON!</h1>
      
      <div className="flex justify-between items-center w-full px-8">
        {/* Pokemon del Usuario */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-white text-xl">Gianni's Pokemon</h2>
          <div className="bg-orange-300 p-6 rounded-xl shadow-lg border-2 border-orange-500">
            <img 
              src={myPokemon[0]?.sprites?.front_default} 
              alt={myPokemon[0]?.name}
              className="w-40 h-40"
            />
          </div>
          <p className="text-white font-bold capitalize text-lg">{myPokemon[0]?.name}</p>
        </div>

        {/* VS */}
        <div className="flex items-center justify-center scale-125 hover:scale-150 transition-transform duration-300">
          <span className="text-7xl font-black tracking-tighter 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-orange-300 via-white to-cyan-400
            filter drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]
            italic px-4">
            VS
          </span>
        </div>

        {/* Pokemon de la PC */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-white text-xl">IA</h2>
          <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 p-6 rounded-xl shadow-lg border-2 border-cyan-700">
            <img 
              src={computerPokemon[0]?.sprites?.front_default} 
              alt={computerPokemon[0]?.name}
              className="w-40 h-40"
            />
          </div>
          <p className="text-white font-bold capitalize text-lg">{computerPokemon[0]?.name}</p>
        </div>
      </div>
    </div>
  )
}

export default GameScreen
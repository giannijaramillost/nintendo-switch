import React from 'react'

function RightControl({handleSelection}) {
  return (
    <div className="w-30 h-81 bg-red-800 border-3 rounded-r-3xl flex flex-col items-center justify-evenly p-4">      {/* 4 Botones en forma de rombo - Negros */}
      <div className="flex flex-col items-center gap-2">
        {/* Arriba (X) */}
        <button className="w-8 h-8 bg-black rounded-full hover:bg-gray-800 font-bold text-white text-sm">X</button>
        
        {/* Izquierda, Centro, Derecha */}
        <div className="flex gap-2 items-center">
          {/* Izquierda (Y) */}
          <button className="w-8 h-8 bg-black rounded-full hover:bg-gray-800 font-bold text-white text-sm">Y</button>
          
          <div className="w-8 h-8"></div>
          
          {/* Derecha (A) */}
          <button 
          onClick={handleSelection}
          className="w-8 h-8 bg-black rounded-full hover:bg-gray-800 font-bold text-white text-sm">A</button>
        </div>
        
        {/* Abajo (B) */}
        <button className="w-8 h-8 bg-black rounded-full hover:bg-gray-800 font-bold text-white text-sm">B</button>
      </div>
      
      {/* Joystick */}
      <div className="w-16 h-16 bg-gray-700 rounded-full border-4 border-gray-600 flex items-center justify-center">
        <div className="w-10 h-10 bg-gray-900 rounded-full"></div>
      </div>
    </div>
  )
}

export default RightControl
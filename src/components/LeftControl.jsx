
function LeftControl({ handleDirection }) {
  return (
    <div className="w-35 h-96 bg-sky-400 border-3 border-gray-600 rounded-l-3xl flex flex-col items-center justify-center gap-8 p-4">
      {/* Joystick */}
      <div className="w-16 h-16 bg-gray-700 rounded-full border-4 border-gray-600 flex items-center justify-center">
        <div className="w-10 h-10 bg-gray-900 rounded-full"></div>
      </div>
      
      {/* D-Pad (Botones directionales) */}
      <div className="flex flex-col items-center gap-2">
        {/* Arriba */}
        <button
        onClick={() => handleDirection('up')} 
        className="w-8 h-8 bg-black rounded-full hover:bg-gray-800 flex items-center justify-center">
          <div style={{width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '8px solid white'}}></div>
        </button>
        
        {/* Izquierda, Centro, Derecha */}
        <div className="flex gap-2">
          <button 
          onClick={() => handleDirection('left')}
          className="w-8 h-8 bg-black rounded-full hover:bg-gray-800 flex items-center justify-center">
            <div style={{width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderRight: '8px solid white'}}></div>
          </button>
          <div className="w-8 h-8"></div>
          <button 
          onClick={() => handleDirection('right')}
          className="w-8 h-8 bg-black rounded-full hover:bg-gray-800 flex items-center justify-center">
            <div style={{width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '8px solid white'}}></div>
          </button>
        </div>
        
        {/* Abajo */}
        <button 
        onClick={() => handleDirection('down')} 
        className="w-8 h-8 bg-black rounded-full hover:bg-gray-800 flex items-center justify-center">
          <div style={{width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid white'}}></div>
        </button>
      </div>
    </div>
  )
}

export default LeftControl
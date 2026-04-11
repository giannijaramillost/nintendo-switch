import { useState, useEffect } from 'react'

function GameScreen({ myPokemon, computerPokemon }) {
  // Función para generar números aleatorios
  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  const [myHP, setMyHP] = useState(100);
  const [pcHP, setPcHP] = useState(100);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleLog, setBattleLog] = useState('¡La batalla comienza!');
  const [battleEnded, setBattleEnded] = useState(false);

  // Obtener los primeros 4 movimientos del jugador
  const playerMoves = myPokemon[0]?.moves?.slice(0, 4) || [];

  // Auto-reset HP cuando cambian los Pokémon seleccionados
  useEffect(() => {
    setMyHP(100);
    setPcHP(100);
    setIsPlayerTurn(true);
    setBattleLog('¡La batalla comienza!');
    setBattleEnded(false);
  }, [myPokemon, computerPokemon]);

  // Calcular daño basado en el poder del ataque
  const calculateDamage = (power) => {
    const variation = getRandomInt(0, 21) - 10; // -10 a +10
    const damage = Math.max(5, power + variation);
    return damage;
  };

  // Función para el ataque del jugador
  const handlePlayerAttack = (moveIndex) => {
    if (!isPlayerTurn || battleEnded) return;

    const move = playerMoves[moveIndex];
    const power = move?.attack || 50;
    const damage = calculateDamage(power);
    
    // Infligir daño al enemigo
    setPcHP((prev) => {
      const newHP = Math.max(0, prev - damage);
      const moveName = move?.move?.name?.toUpperCase() || 'ATAQUE';
      
      if (newHP <= 0) {
        setBattleLog(`¡${moveName}! Infligiste ${damage} de daño. ¡${computerPokemon[0]?.name?.toUpperCase()} fue derrotado!`);
        setBattleEnded(true);
      } else {
        setBattleLog(`¡${moveName}! Infligiste ${damage} de daño.`);
      }
      
      return newHP;
    });

    setIsPlayerTurn(false);
  };

  // Turno automático del enemigo
  useEffect(() => {
    if (!isPlayerTurn && !battleEnded && pcHP > 0) {
      const timer = setTimeout(() => {
        const enemyDamage = calculateDamage(getRandomInt(30, 100));
        
        setMyHP((prev) => {
          const newHP = Math.max(0, prev - enemyDamage);
          
          if (newHP <= 0) {
            setBattleLog(`¡El enemigo te golpea! ¡Te infligió ${enemyDamage} de daño! ¡Fuiste derrotado!`);
            setBattleEnded(true);
          } else {
            setBattleLog(`¡El enemigo te golpea! ¡Te infligió ${enemyDamage} de daño!`);
          }
          
          return newHP;
        });

        setIsPlayerTurn(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, battleEnded, pcHP]);

  return (
    <div className="w-[42rem] h-96 border-8 border-black bg-gray-800 relative overflow-hidden">
      <h1 className="text-white text-4xl font-bold text-center py-4">¡BATALLA POKEMON!</h1>
      
      {/* HP Player - Superior Izquierda */}
      <div className="absolute top-20 left-8">
        <p className="text-white font-bold capitalize">{myPokemon[0]?.name}</p>
        <p className="text-white text-lg font-bold">HP: {Math.max(0, myHP)}/100</p>
      </div>

      {/* HP Enemigo - Superior Derecha */}
      <div className="absolute top-20 right-8">
        <p className="text-white font-bold capitalize text-right">{computerPokemon[0]?.name}</p>
        <p className="text-white text-lg font-bold text-right">HP: {Math.max(0, pcHP)}/100</p>
      </div>

      {/* Pokemon del Usuario - Esquina Inferior Izquierda */}
      <div className="absolute bottom-8 left-8">
        <img 
          src={myPokemon[0]?.sprites?.back_default} 
          alt={myPokemon[0]?.name}
          className="w-40 h-40"
        />
      </div>

      {/* Pokemon de la PC - Esquina Superior Derecha */}
      <div className="absolute top-28 right-8">
        <img 
          src={computerPokemon[0]?.sprites?.front_default} 
          alt={computerPokemon[0]?.name}
          className="w-40 h-40"
        />
      </div>
      {/* Battle Log - Centro */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-white text-lg font-bold bg-gray-900 bg-opacity-70 px-6 py-3 rounded">
          {battleLog}
        </p>
      </div>

      {/* Botones de Ataque - Inferior Centro */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
        {playerMoves.map((move, index) => (
          <button
            key={index}
            onClick={() => handlePlayerAttack(index)}
            disabled={!isPlayerTurn || battleEnded}
            className={`px-4 py-2 rounded font-bold capitalize text-white transition-all ${
              isPlayerTurn && !battleEnded
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-500 cursor-not-allowed opacity-50'
            }`}
          >
            {move?.move?.name || `Ataque ${index + 1}`}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GameScreen
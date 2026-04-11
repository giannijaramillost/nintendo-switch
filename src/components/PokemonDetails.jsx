
export default function PokemonDetails({ actual }) {
  if (!actual?.length) {
    return null;
  }

  const pokemon = actual[0];

  const name = pokemon?.name;
  const id = pokemon?.id;
  const types = pokemon?.types || [];
  const frontSprite = pokemon?.sprites?.front_default;
  const backSprite = pokemon?.sprites?.back_default;
  const moves = pokemon?.moves?.slice(0, 10) || [];

  const mainType = types?.length > 0 ? types[0]?.type?.name : "unknown";

  const getTypeColor = (type) => {
    const typeColors = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      grass: "bg-green-500",
      electric: "bg-yellow-400",
      ice: "bg-cyan-400",
      fighting: "bg-orange-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-indigo-400",
      psychic: "bg-pink-500",
      bug: "bg-lime-500",
      rock: "bg-gray-600",
      ghost: "bg-purple-700",
      dragon: "bg-violet-600",
      dark: "bg-gray-800",
      steel: "bg-slate-400",
      fairy: "bg-pink-300",
    };
    return typeColors[type] || "bg-gray-500";
  };

  return (
    <div className="w-full bg-gray-700 border-4 border-black p-4 mt-4 shadow-lg">
      {/* Encabezado: Nombre e ID */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-gray-600">
        <h2 className="text-2xl font-bold text-yellow-300 uppercase">
          {name}
        </h2>
        <span className="text-white font-bold text-lg bg-gray-800 px-3 py-1 rounded border border-gray-600">
          #{id}
        </span>
      </div>

      {/* Tipo de pokémon */}
      <div className="mb-4 text-center">
        <span
          className={`inline-block px-4 py-2 rounded font-bold text-white uppercase text-sm border-2 border-gray-600 ${getTypeColor(
            mainType
          )}`}
        >
          Type: {mainType}
        </span>
      </div>

      {/* Sprites - Frente y Dorsal lado a lado */}
      <div className="flex justify-center gap-8 mb-6 bg-gray-600 p-4 rounded border-2 border-gray-500">
        {/* Sprite frontal */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 p-2 rounded border-2 border-gray-500">
            {frontSprite ? (
              <img
                src={frontSprite}
                alt={`${name} front`}
                className="w-40 h-40"
                style={{ imageRendering: "pixelated" }}
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
          <p className="text-white text-sm mt-2 font-bold">FRONT</p>
        </div>

        {/* Sprite dorsal */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 p-2 rounded border-2 border-gray-500">
            {backSprite ? (
              <img
                src={backSprite}
                alt={`${name} back`}
                className="w-40 h-40"
                style={{ imageRendering: "pixelated" }}
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
          <p className="text-white text-sm mt-2 font-bold">BACK</p>
        </div>
      </div>

      {/* Movimientos */}
      <div className="bg-gray-600 p-4 rounded border-2 border-gray-500">
        <h3 className="text-white font-bold mb-3 uppercase text-lg border-b border-gray-500 pb-2">
          Moves ({moves.length})
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {moves.length > 0 ? (
            moves.map((moveData, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-700 p-3 rounded border border-gray-500 hover:bg-gray-650 transition"
              >
                <span className="text-yellow-300 font-bold uppercase text-sm flex-1">
                  {moveData?.move?.name || "Unknown"}
                </span>
                <span className="text-red-400 font-bold text-sm bg-gray-800 px-2 py-1 rounded border border-red-600">
                  PWR: {moveData?.attack || 0}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic text-center py-3">
              No moves available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
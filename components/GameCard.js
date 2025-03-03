export default function GameCard({ game }) {
  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white">
      <img 
        src={game.Imagen || "/placeholder.jpg"} 
        alt={game.Nombre} 
        className="w-full h-40 object-cover rounded" 
      />
      <h2 className="text-lg font-semibold mt-2">{game.Nombre}</h2>
      <p className="text-gray-500">{game.Tipo}</p>

      {/* Precios con oferta */}
      <div className="mt-2">
        <p className="text-gray-500 line-through">
          Precio Original: {game.PrecioOriginal ? `$${game.PrecioOriginal}` : "N/A"}
        </p>
        <p className="text-green-600 font-bold">
          Precio Oferta: {game.PrecioOferta ? `$${game.PrecioOferta}` : "N/A"}
        </p>
      </div>

      {/* Descuento con símbolo de porcentaje */}
      <p className="text-red-500 font-semibold mt-2">
        {game.Descuento ? `${game.Descuento}%` : "Sin descuento"}
      </p>
    </div>
  );
}

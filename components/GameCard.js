export default function GameCard({ game }) {
    return (
      <div className="border rounded-lg p-4 shadow-lg bg-white">
        <img src={game.Imagen || "/placeholder.jpg"} alt={game.Nombre} className="w-full h-40 object-cover rounded" />
        <h2 className="text-lg font-semibold mt-2">{game.Nombre}</h2>
        <p className="text-gray-500">{game.Tipo}</p>
        <p className="text-gray-700 font-bold">${game.Precio}</p>
        <p className="text-red-500">{game.Descuento}</p>
      </div>
    );
  }
  
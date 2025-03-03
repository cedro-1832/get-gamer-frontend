"use client"; // Necesario para usar hooks en App Router

import { useEffect, useState } from "react";
import GameCard from "@/components/GameCard";
import FilterBar from "@/components/FilterBar";

const API_URL = "https://85r1nm2npg.execute-api.us-east-1.amazonaws.com/dev/api/games";

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(""); // Estado para ordenar

  const fetchGames = async (filters = {}) => {
    setLoading(true);

    const params = new URLSearchParams(filters);
    if (sort) params.append("sort", sort); // Agrega el parámetro de orden si está definido

    const url = `${API_URL}?${params.toString()}`;

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        },
      });
      const data = await res.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [sort]); // Se vuelve a ejecutar cuando cambia el orden

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Catálogo de Juegos</h1>
      <FilterBar onFilter={fetchGames} setSort={setSort} />
      {loading ? (
        <p className="text-center">Cargando juegos...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 mt-6">
          {games.length > 0 ? games.map((game, index) => (
            <GameCard key={game.id || `game-${index}`} game={game} />
          )) : (
            <p className="text-center col-span-3 text-gray-500">No hay juegos disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
}

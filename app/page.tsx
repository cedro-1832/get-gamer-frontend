"use client"; // Necesario para usar hooks en App Router

import { useEffect, useState } from "react";
import GameCard from "@/components/GameCard";
import FilterBar from "@/components/FilterBar";

const API_URL = "https://85r1nm2npg.execute-api.us-east-1.amazonaws.com/dev/api/games";

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async (filters = {}) => {
    setLoading(true);

    const queryString = new URLSearchParams(filters).toString();
    const url = `${API_URL}?${queryString}`;

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
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Catálogo de Juegos</h1>
      <FilterBar onFilter={fetchGames} />
      {loading ? (
        <p className="text-center">Cargando juegos...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 mt-6">
          {games.length > 0 ? games.map(game => <GameCard key={game.id} game={game} />) : 
            <p className="text-center col-span-3 text-gray-500">No hay juegos disponibles.</p>}
        </div>
      )}
    </div>
  );
}

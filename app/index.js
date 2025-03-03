import { useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import FilterBar from "../components/FilterBar";

export async function getServerSideProps(context) {
  const { query } = context;
  const API_URL = `https://85r1nm2npg.execute-api.us-east-1.amazonaws.com/dev/api/games`;
  
  const filters = {
    Tipo: query.Tipo || null,
    PrecioMin: query.PrecioMin || null,
    PrecioMax: query.PrecioMax || null,
    Nombre: query.Nombre || "",
    DescuentoMin: query.DescuentoMin || null,
    DescuentoMax: query.DescuentoMax || null
  };

  const queryString = new URLSearchParams(filters).toString();

  const res = await axios.get(`${API_URL}?${queryString}`, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBsYXlzdGF0aW9uLmNvbSIsImlhdCI6MTc0MDk3MTkyMCwiZXhwIjoxNzQwOTc1NTIwfQ.kbEt2fl92NGbUmTUUuxRPzrLLgE0dPLFena9QVcZ6Mc"
    }
  });

  return {
    props: { games: res.data }
  };
}

export default function Home({ games }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Catálogo de Juegos</h1>
      <FilterBar />
      <div className="grid grid-cols-3 gap-6 mt-6">
        {games.length > 0 ? games.map(game => <GameCard key={game.id} game={game} />) : 
          <p className="text-center col-span-3 text-gray-500">No hay juegos disponibles.</p>}
      </div>
    </div>
  );
}

"use client"; // Necesario en componentes que usan hooks

import { useState } from "react";

export default function FilterBar({ onFilter }) {
  const [filters, setFilters] = useState({
    Tipo: "",
    PrecioMin: "",
    PrecioMax: "",
    Nombre: "",
    DescuentoMin: "",
    DescuentoMax: ""
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    const query = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v));
    onFilter(query); // Llama a la función para obtener los juegos filtrados
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md flex gap-4">
      <input type="text" name="Nombre" placeholder="Buscar..." className="p-2 border rounded w-full" onChange={handleChange} />
      <input type="text" name="Tipo" placeholder="Tipo" className="p-2 border rounded" onChange={handleChange} />
      <input type="number" name="PrecioMin" placeholder="Precio Mín." className="p-2 border rounded" onChange={handleChange} />
      <input type="number" name="PrecioMax" placeholder="Precio Máx." className="p-2 border rounded" onChange={handleChange} />
      <input type="number" name="DescuentoMin" placeholder="Desc. Mín." className="p-2 border rounded" onChange={handleChange} />
      <input type="number" name="DescuentoMax" placeholder="Desc. Máx." className="p-2 border rounded" onChange={handleChange} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={applyFilters}>Filtrar</button>
    </div>
  );
}

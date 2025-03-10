"use client"; // Necesario en componentes que usan hooks

import { useState } from "react";

export default function FilterBar({ onFilter, setSort }) {
  const initialFilters = {
    Tipo: "",
    PrecioMin: "",
    PrecioMax: "",
    Nombre: "",
    DescuentoMin: "",
    DescuentoMax: ""
  };

  const [filters, setFilters] = useState(initialFilters);

  const tipos = ["", "Vehicle", "Level", "Season Pass", "Costume", "Weapons"];
  const sortOptions = [
    { value: "", label: "Ordenar por..." },
    { value: "name", label: "Nombre (A-Z)" },
    { value: "price_asc", label: "Precio (menor a mayor)" },
    { value: "price_desc", label: "Precio (mayor a menor)" },
    { value: "discount", label: "Mayor descuento" },
  ];

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    const query = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v));
    onFilter(query); // Llama a la función para obtener los juegos filtrados
  };

  const resetFilters = () => {
    setFilters(initialFilters); // Restablecer filtros al estado inicial
    setSort(""); // Restablecer ordenamiento
    onFilter({}); // Llamar a la función para recargar los juegos sin filtros
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md flex flex-wrap gap-4">
      <input 
        type="text" 
        name="Nombre" 
        placeholder="Buscar..." 
        className="p-2 border rounded w-full md:w-1/4" 
        value={filters.Nombre}
        onChange={handleChange} 
      />
      
      <select 
        name="Tipo" 
        className="p-2 border rounded w-full md:w-1/5" 
        onChange={handleChange} 
        value={filters.Tipo}
      >
        {tipos.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo || "Seleccionar Tipo"}
          </option>
        ))}
      </select>

      <input 
        type="number" 
        name="PrecioMin" 
        placeholder="Precio Mín." 
        className="p-2 border rounded w-full md:w-1/6" 
        value={filters.PrecioMin}
        onChange={handleChange} 
      />
      <input 
        type="number" 
        name="PrecioMax" 
        placeholder="Precio Máx." 
        className="p-2 border rounded w-full md:w-1/6" 
        value={filters.PrecioMax}
        onChange={handleChange} 
      />
      <input 
        type="number" 
        name="DescuentoMin" 
        placeholder="Desc. Mín." 
        className="p-2 border rounded w-full md:w-1/6" 
        value={filters.DescuentoMin}
        onChange={handleChange} 
      />
      <input 
        type="number" 
        name="DescuentoMax" 
        placeholder="Desc. Máx." 
        className="p-2 border rounded w-full md:w-1/6" 
        value={filters.DescuentoMax}
        onChange={handleChange} 
      />

      {/* Selector de ordenamiento */}
      <select 
        className="p-2 border rounded w-full md:w-1/5" 
        onChange={(e) => setSort(e.target.value)}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto" 
        onClick={applyFilters}
      >
        Filtrar
      </button>

      <button 
        className="bg-gray-400 text-white px-4 py-2 rounded w-full md:w-auto" 
        onClick={resetFilters}
      >
        Limpiar Filtros
      </button>
    </div>
  );
}

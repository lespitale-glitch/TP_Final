import React, { useState, useEffect } from 'react';
import MealCard from './components/MealCard';
import './index.css';

export default function App() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Lo que se envía al backend
  const [inputValue, setInputValue] = useState('');  // Lo que se tipea en el input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMealsData = async () => {
      setLoading(true);
      setError(false);
      
      // Si el buscador está vacío, listamos recetas por defecto buscando la letra "p"
      // Si el usuario ingresó algo, le pegamos al endpoint de búsqueda directo de TheMealDB
      const query = searchTerm.trim() === '' ? 'p' : searchTerm.trim();
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en los servidores de la API');
        
        const data = await response.json();
        
        // Si la API devuelve null es porque esa comida no existe en sus registros
        if (data.meals === null) {
          setError(true);
          setMeals([]);
        } else {
          setMeals(data.meals);
        }
      } catch (err) {
        console.error("Error de conexión:", err);
        setError(true);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMealsData();
  }, [searchTerm]); // Reacciona de forma indestructible cada vez que se actualiza el término buscado

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue); // Despierta el useEffect con la nueva query limpia
  };

  return (
    <div className="app-container">
      <header>
        <h1>Chef Dex</h1>
        <p> Si te picó el bagre... 🐟 Busca la receta acá 👇 ¡no seas vago! 🥩🇦🇷</p>
        {searchTerm && (
          <p style={{ marginTop: '15px', color: '#f97316', fontSize: '13pt' }}>
            Resultados para la búsqueda: <strong>"{searchTerm}"</strong>
          </p>
        )}
      </header>

      {/* Buscador unificado e indestructible */}
      <form onSubmit={handleFormSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar receta (Ej: chicken, pasta, pizza, beef...)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="search-button">
          Buscar Receta
        </button>
      </form>

      {/* Control de estados condicionales requeridos por el profesor */}
      {loading && <div className="status-message">Calentando los motores de la cocina...</div>}
      
      {error && !loading && (
        <div className="status-message">
          ❌ No se encontraron recetas para: "{searchTerm}".
          <br />
          <small style={{ fontSize: '11pt', color: '#888' }}>Intenta buscando ingredientes o platos en inglés como "chicken", "pasta", "cake" o "rice", pero si sos argento tambien esta "locro", "milanesa" o "asado" 🤤.</small>
        </div>
      )}
      
      {!loading && !error && (
        <div className="grid-container">
          {meals.map((mealItem) => (
            <MealCard key={mealItem.idMeal} meal={mealItem} />
          ))}
        </div>
      )}
    </div>
  );
}
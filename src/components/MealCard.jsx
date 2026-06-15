import React from 'react';

export default function MealCard({ meal }) {
  return (
    <div className="card-wrapper">
      {/* 1. Imagen del plato */}
      <img 
        className="card-image"
        src={meal.strMealThumb} 
        alt={meal.strMeal} 
      />
      
      <div className="card-info-box">
        {/* 2. Título / Nombre del plato */}
        <h3 className="card-title" title={meal.strMeal}>{meal.strMeal}</h3>
        
        {/* 3. Categoría */}
        <p className="card-data">
          <strong>Categoría:</strong> 🍽️ {meal.strCategory || 'General'}
        </p>
        
        {/* 4. Origen */}
        <p className="card-data">
          <strong>Origen:</strong> 🌍 {meal.strArea || 'Internacional'}
        </p>

        {/* 5. Ingrediente principal */}
        <p className="card-data">
          <strong>Principal:</strong> 🥩 {meal.strIngredient1 || 'Varios'}
        </p>

        {/* 🌟 NUEVO: Cuadro con la Receta / Instrucciones Paso a Paso */}
        <div style={{ 
          marginTop: '12px', 
          paddingTop: '12px', 
          borderTop: '1px solid #334155' 
        }}>
          <strong style={{ color: '#f97316', fontSize: '10pt', display: 'block', marginBottom: '5px' }}>
            📜 RECETA / INSTRUCCIONES:
          </strong>
          <div style={{ 
            maxHeight: '100px', 
            overflowY: 'auto', 
            fontSize: '9.5pt', 
            color: '#cbd5e1', 
            lineHeight: '1.4',
            paddingRight: '5px',
            textAlign: 'left'
          }}>
            {meal.strInstructions || 'No hay instrucciones disponibles para este plato.'}
          </div>
        </div>

      </div>
    </div>
  );
}
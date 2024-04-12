import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../../components/UI/Sidebar/Sidebar';

import './DashboardFood.css';

const ingredients = [
    { name: 'Manzana', calories: 52, protein: 0.3, fat: 0.2, sugar: 10.4, carbs: 13.8 },
    { name: 'Plátano', calories: 89, protein: 1.1, fat: 0.3, sugar: 12.2, carbs: 22.8 },
    { name: 'Zanahoria', calories: 41, protein: 0.9, fat: 0.2, sugar: 4.7, carbs: 9.6 },
    { name: 'Tomate', calories: 18, protein: 0.9, fat: 0.2, sugar: 2.6, carbs: 3.9 },
    { name: 'Espinaca', calories: 23, protein: 2.9, fat: 0.4, sugar: 0.4, carbs: 3.6 },
    { name: 'Huevo', calories: 155, protein: 13, fat: 11, sugar: 1.1, carbs: 1.1 },
    { name: 'Leche', calories: 42, protein: 3.4, fat: 1, sugar: 5, carbs: 5 },
    { name: 'Yogur', calories: 59, protein: 10, fat: 0.4, sugar: 5.8, carbs: 3.6 },
    { name: 'Arroz blanco', calories: 130, protein: 2.7, fat: 0.3, sugar: 0.1, carbs: 28.6 },
    { name: 'Lentejas', calories: 116, protein: 9.0, fat: 0.4, sugar: 1.8, carbs: 20.1 },
    { name: 'Tofu', calories: 76, protein: 8, fat: 4.8, sugar: 0.7, carbs: 1.9 },
    { name: 'Salmón', calories: 208, protein: 20, fat: 13, sugar: 0, carbs: 0 },
    { name: 'Pechuga de pollo', calories: 165, protein: 31, fat: 3.6, sugar: 0, carbs: 0 },
    { name: 'Ternera', calories: 250, protein: 26, fat: 15, sugar: 0, carbs: 0 },
    { name: 'Pavo', calories: 189, protein: 29, fat: 7, sugar: 0, carbs: 0 },
    { name: 'Aguacate', calories: 160, protein: 2, fat: 15, sugar: 0.7, carbs: 9 },
    { name: 'Fresas', calories: 32, protein: 0.7, fat: 0.3, sugar: 4.9, carbs: 7.7 },
    { name: 'Naranja', calories: 47, protein: 0.9, fat: 0.1, sugar: 9.4, carbs: 11.8 },
    { name: 'Papas', calories: 77, protein: 2.0, fat: 0.1, sugar: 0.8, carbs: 17.5 },
    { name: 'Pan blanco', calories: 265, protein: 9, fat: 3.2, sugar: 5, carbs: 49 },
    { name: 'Queso Cheddar', calories: 402, protein: 25, fat: 33, sugar: 0.1, carbs: 1.3 },
    { name: 'Almendras', calories: 579, protein: 21, fat: 50, sugar: 4.8, carbs: 22 },
    { name: 'Mantequilla', calories: 717, protein: 0.9, fat: 81, sugar: 0.1, carbs: 0.1 },
    { name: 'Aceite de oliva', calories: 884, protein: 0, fat: 100, sugar: 0, carbs: 0 },
    { name: 'Chocolate negro', calories: 546, protein: 5, fat: 31, sugar: 24, carbs: 61 },
    { name: 'Brócoli', calories: 34, protein: 2.8, fat: 0.4, sugar: 1.7, carbs: 6.6 },
    { name: 'Garbanzos', calories: 164, protein: 8.9, fat: 2.6, sugar: 8, carbs: 27.4 },
    { name: 'Avena', calories: 389, protein: 16.9, fat: 6.9, sugar: 0, carbs: 66.3 },
    { name: 'Quinoa', calories: 120, protein: 4.1, fat: 1.9, sugar: 0, carbs: 21.3 },
    { name: 'Alubias negras', calories: 132, protein: 8.9, fat: 0.5, sugar: 0, carbs: 23.7 },
    { name: 'Maíz', calories: 86, protein: 3.2, fat: 1.2, sugar: 4.5, carbs: 19 },
    { name: 'Mango', calories: 60, protein: 0.8, fat: 0.4, sugar: 13.7, carbs: 15 },
    { name: 'Pera', calories: 57, protein: 0.4, fat: 0.1, sugar: 9.8, carbs: 15.1 },
    { name: 'Melón', calories: 34, protein: 0.8, fat: 0.2, sugar: 7.9, carbs: 8.2 },
    { name: 'Sandía', calories: 30, protein: 0.6, fat: 0.2, sugar: 6.2, carbs: 7.6 },
    { name: 'Kiwi', calories: 61, protein: 1.1, fat: 0.5, sugar: 9, carbs: 14.7 },
    { name: 'Frambuesas', calories: 52, protein: 1.2, fat: 0.7, sugar: 4.4, carbs: 11.9 },
    { name: 'Arándanos', calories: 57, protein: 0.7, fat: 0.3, sugar: 9.96, carbs: 14.5 },
    { name: 'Cacahuetes', calories: 567, protein: 25.8, fat: 49.2, sugar: 4.7, carbs: 16.1 },
    { name: 'Pistachos', calories: 562, protein: 20.3, fat: 45.4, sugar: 7.7, carbs: 27.5 },
    { name: 'Nueces', calories: 654, protein: 15.2, fat: 65.2, sugar: 2.6, carbs: 13.7 },
    { name: 'Calabaza', calories: 26, protein: 1, fat: 0.1, sugar: 2.8, carbs: 6.5 },
    { name: 'Berenjena', calories: 25, protein: 1, fat: 0.2, sugar: 3.5, carbs: 6 },
    { name: 'Espárragos', calories: 20, protein: 2.2, fat: 0.1, sugar: 1.2, carbs: 3.9 },
    { name: 'Pepino', calories: 16, protein: 0.7, fat: 0.1, sugar: 1.7, carbs: 3.6 },
    { name: 'Calabacín', calories: 17, protein: 1.2, fat: 0.3, sugar: 2.5, carbs: 3.1 },
    { name: 'Remolacha', calories: 43, protein: 1.6, fat: 0.2, sugar: 6.8, carbs: 10 },
    { name: 'Apio', calories: 16, protein: 0.7, fat: 0.2, sugar: 1.8, carbs: 3 },
    { name: 'Coles de Bruselas', calories: 43, protein: 3.4, fat: 0.3, sugar: 2.2, carbs: 8.9 },
    { name: 'Col rizada', calories: 35, protein: 2.9, fat: 1.5, sugar: 0, carbs: 4.4 }
];

function DashboardFood() {
    const [isCreatingDiet, setIsCreatingDiet] = useState(false);
    const [meals, setMeals] = useState({
        Lunes: 0,
        Martes: 0,
        Miércoles: 0,
        Jueves: 0,
        Viernes: 0,
        Sábado: 0,
        Domingo: 0
    });
    const [selectedIngredients, setSelectedIngredients] = useState({});

    const handleIngredientChange = (day, mealIndex, ingredientIndex, event) => {
        const newSelectedIngredients = { ...selectedIngredients };
        if (!newSelectedIngredients[day]) {
            newSelectedIngredients[day] = {};
        }
        if (!newSelectedIngredients[day][mealIndex]) {
            newSelectedIngredients[day][mealIndex] = [];
        }
        newSelectedIngredients[day][mealIndex][ingredientIndex] = event.target.value;
        setSelectedIngredients(newSelectedIngredients);
    };

    const addIngredient = (day, mealIndex) => {
        const newSelectedIngredients = { ...selectedIngredients };
        if (!newSelectedIngredients[day]) {
            newSelectedIngredients[day] = {};
        }
        if (!newSelectedIngredients[day][mealIndex]) {
            newSelectedIngredients[day][mealIndex] = [];
        }
        newSelectedIngredients[day][mealIndex].push('');
        setSelectedIngredients(newSelectedIngredients);
    };

    const navigate = useNavigate();

    const handleMealChange = (day, e) => {
        setMeals({ ...meals, [day]: e.target.value });
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = JSON.parse(localStorage.getItem('response'));
        // const token = localStorage.getItem('token');

        // console.log(user, response.data[0]);
        if (user === undefined) {
            navigate('/login');
        } else {
        }
    }, []);

    return (
        <>
            <Sidebar />
            <main className="food">
                <div className="food_title">
                    <div className="dashboard_titleText">vitatri's<span>cipes</span></div>
                    <div className="food_titleSubtext">Recetas</div>
                </div>
                <div className="food_container">
                    <p className="food_container_title">¿Quiéres generar una dieta <span>SOLO PARA TI</span> de forma automática?</p>
                    {isCreatingDiet ? (
                        <form className="food_container_formContainer">
                            {Object.entries(meals).map(([day, mealCount]) => (
                                <div key={day}>
                                    <div className="food_container_formRow">
                                        <label htmlFor={day}>{day}</label>
                                        <input type="number" id={day} name={day} onChange={(event) => handleMealChange(day, event)} />
                                    </div>
                                    {Array.from({ length: mealCount }, (_, mealIndex) => (
                                        <div key={mealIndex} className="food_container_formRow">
                                            <label htmlFor={`${day}-meal-${mealIndex}`}>Comida {mealIndex + 1}</label>
                                            {(selectedIngredients[day] && selectedIngredients[day][mealIndex] ? selectedIngredients[day][mealIndex] : ['']).map((selectedIngredient, ingredientIndex) => (
                                                <div key={ingredientIndex}>
                                                    <select id={`${day}-meal-${mealIndex}-ingredient-${ingredientIndex}`} name={`${day}-meal-${mealIndex}-ingredient-${ingredientIndex}`} onChange={(event) => handleIngredientChange(day, mealIndex, ingredientIndex, event)}>
                                                        <option value="">Selecciona un ingrediente</option>
                                                        {ingredients.map((ingredient, index) => (
                                                            <option key={index} value={ingredient.name}>{ingredient.name}</option>
                                                        ))}
                                                    </select>
                                                    {selectedIngredient && ingredients.find(ingredient => ingredient.name === selectedIngredient) && (
                                                        <div>
                                                            <p>Calorías: {ingredients.find(ingredient => ingredient.name === selectedIngredient).calories}</p>
                                                            <p>Proteínas: {ingredients.find(ingredient => ingredient.name === selectedIngredient).protein}</p>
                                                            <p>Grasas: {ingredients.find(ingredient => ingredient.name === selectedIngredient).fat}</p>
                                                            <p>Azúcares: {ingredients.find(ingredient => ingredient.name === selectedIngredient).sugar}</p>
                                                            <p>Carbohidratos: {ingredients.find(ingredient => ingredient.name === selectedIngredient).carbs}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addIngredient(day, mealIndex)}>+</button>
                                            <label htmlFor={`${day}-time-${mealIndex}`}>Hora</label>
                                            <input type="time" id={`${day}-time-${mealIndex}`} name={`${day}-time-${mealIndex}`} />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </form>
                    ) : (
                        <div className="food_container_buttonContainer">
                            <button className="food_container_button">Generar dieta</button>
                            <button className="food_container_button" onClick={() => setIsCreatingDiet(true)}>Crear dieta personalizada</button>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}

export default DashboardFood
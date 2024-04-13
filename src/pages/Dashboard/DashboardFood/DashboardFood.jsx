import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Sidebar from '../../../components/UI/Sidebar/Sidebar';
import ingredients from '../../../utils/ingredients';
import postDiet from '../../../utils/postDiet';

import './DashboardFood.css';

function DashboardFood() {
    const [isCreatingDiet, setIsCreatingDiet] = useState(false);
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const [diets, setDiets] = useState([]);
    const [meals, setMeals] = useState({
        Lunes: 0,
        Martes: 0,
        Miércoles: 0,
        Jueves: 0,
        Viernes: 0,
        Sábado: 0,
        Domingo: 0
    });

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

    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const diet = Object.entries(selectedIngredients).map(([day, meals]) => ({
            day,
            meals: Object.entries(meals).map(([mealIndex, ingredients]) => ({
                time: document.getElementById(`${day}-time-${mealIndex}`).value,
                ingredients
            }))
        }));

        const data = await postDiet(`https://vitatriserver-production.up.railway.app/api/diet/create`, { userId: user.id, diet });
        console.log(data);
        handleGetDiets();
        isCreatingDiet && setIsCreatingDiet(false);

        setSelectedIngredients({});
    };

    const handleGetDiets = async () => {
        const data = await postDiet(`https://vitatriserver-production.up.railway.app/api/diet/get`, { userId: user.id });
        console.log(data);
        setDiets(data);
    };

    const handleGenerateDiet = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            console.error('No user found');
            return;
        }

        const data = await postDiet(`https://vitatriserver-production.up.railway.app/api/diet/generate`, { userId: user.id });
        console.log(data);
        setDiets(data);
        handleGetDiets();
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user === undefined) {
            navigate('/login');
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
                    {isCreatingDiet ? (
                        <p className="food_container_title">Empieza poniendo en cada campo cuantas <span>COMIDAS POR DÍA</span> tendrás.</p>
                    ) : (
                        <p className="food_container_title">¿Quiéres generar una dieta <span>SOLO PARA TI</span> de forma automática?</p>
                    )}
                    {isCreatingDiet ? (
                        <form className="food_container_formContainer" onSubmit={handleSubmit}>
                            {Object.entries(meals).map(([day, mealCount]) => (
                                <div key={day}>
                                    <div className="food_container_formRow">
                                        <label className="food_label" htmlFor={day}>¿Cuántas comidas tendrás el {day}?</label>
                                        <input className="food_input" type="number" id={day} name={day} onChange={(event) => handleMealChange(day, event)} />
                                    </div>
                                    {Array.from({ length: mealCount }, (_, mealIndex) => (
                                        <div key={mealIndex}>
                                            <label className="food_title" htmlFor={`${day}-meal-${mealIndex}`}>Comida {mealIndex + 1}</label>
                                            <div>
                                                {(selectedIngredients[day] && selectedIngredients[day][mealIndex] ? selectedIngredients[day][mealIndex] : ['']).map((selectedIngredient, ingredientIndex) => (
                                                    <div key={ingredientIndex}>
                                                        <select
                                                            id={`${day}-meal-${mealIndex}-ingredient-${ingredientIndex}`}
                                                            name={`${day}-meal-${mealIndex}-ingredient-${ingredientIndex}`}
                                                            onChange={(event) => handleIngredientChange(day, mealIndex, ingredientIndex, event)}
                                                            className="food_containerInput"
                                                        >
                                                            <option value="">Selecciona un ingrediente</option>
                                                            {ingredients.map((ingredient, index) => (
                                                                <option key={index} value={ingredient.name}>{ingredient.name}</option>
                                                            ))}
                                                        </select>
                                                        {selectedIngredient && (
                                                            <>
                                                                {(() => {
                                                                    const ingredient = ingredients.find(i => i.name === selectedIngredient);
                                                                    if (!ingredient) return null;
                                                                    const { quantity, calories, protein, fat, sugar, carbs } = ingredient;
                                                                    return (
                                                                        <div className="food_ingredientsConatainer">
                                                                            <p className="food_ingredientsContainer_title">{selectedIngredient}: {quantity}</p>
                                                                            <div className="food_ingredientsContainer_content">
                                                                                <div className="food_ingredientsContainer_contentContainer">
                                                                                    <p className="food_ingredientsContainer_contentContainer_textQuantity">{calories} cal</p>
                                                                                    <p className="food_ingredientsContainer_contentContainer_text">Calorías</p>
                                                                                </div>
                                                                                <div className="food_ingredientsContainer_contentContainer">
                                                                                    <div className="food_ingredientsContainer_contentContainer_textQuantity">{protein} g</div>
                                                                                    <div className="food_ingredientsContainer_contentContainer_text">Proteínas</div>
                                                                                </div>
                                                                                <div className="food_ingredientsContainer_contentContainer">
                                                                                    <div className="food_ingredientsContainer_contentContainer_textQuantity">{fat} g</div>
                                                                                    <div className="food_ingredientsContainer_contentContainer_text">Grasas</div>
                                                                                </div>
                                                                                <div className="food_ingredientsContainer_contentContainer">
                                                                                    <div className="food_ingredientsContainer_contentContainer_textQuantity">{sugar} g</div>
                                                                                    <div className="food_ingredientsContainer_contentContainer_text">Azúcares</div>
                                                                                </div>
                                                                                <div className="food_ingredientsContainer_contentContainer">
                                                                                    <div className="food_ingredientsContainer_contentContainer_textQuantity">{carbs} g</div>
                                                                                    <div className="food_ingredientsContainer_contentContainer_text">Carbohidratos</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })()}
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="food_containerButton" type="button" onClick={() => addIngredient(day, mealIndex)}>Agregar nuevo ingrediente</button>
                                            <div className="food_containerHour">
                                                <label className="food_miniLabelHour" htmlFor={`${day}-time-${mealIndex}`}>¿A qué hora la comerás?</label>
                                                <input className="food_containerInputHour" type="time" id={`${day}-time-${mealIndex}`} name={`${day}-time-${mealIndex}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button className="food_container_button" type="submit">Crear dieta</button>
                        </form>
                    ) : (
                        <div className="food_container_buttonContainer">
                            <button className="food_container_button" onClick={handleGenerateDiet}>Generar dieta</button>
                            <button className="food_container_button" onClick={() => setIsCreatingDiet(true)}>Crear dieta personalizada</button>
                            <button className="food_container_button" onClick={handleGetDiets}>Mostrar dietas</button>
                        </div>
                    )}
                    {diets && diets.map((diet, index) => (
                        <div key={index}>
                            <p className="dietContainerTitle">Dieta {index + 1}</p>
                            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(day => (
                                <div className="dietContainer" key={day}>
                                    <p className="dietContainer_title">{day}</p>
                                    {diet[day] && diet[day].map((meal, mealIndex) => (
                                        <div className="dietContainerContainer" key={mealIndex}>
                                            <p className="dietContainer_subtitle">Hora: {meal.time}</p>
                                            <div>
                                                {meal.ingredients.map(ingredientName => {
                                                    const ingredient = ingredients.find(i => i.name === ingredientName);
                                                    return (
                                                        <div className="dietContainer_ingredients">
                                                            <p className="dietContainer_ingredientsTitle">{ingredientName}</p>
                                                            {ingredient ? (
                                                                <div className="dietContainer_ingredientsContainer">
                                                                    <div className="food_ingredientsContainer_contentContainer">
                                                                        <p className="food_ingredientsContainer_contentContainer_textQuantity">{ingredient.calories} cal</p>
                                                                        <p className="food_ingredientsContainer_contentContainer_text">Calorías</p>
                                                                    </div>
                                                                    <div className="food_ingredientsContainer_contentContainer">
                                                                        <p className="food_ingredientsContainer_contentContainer_textQuantity">{ingredient.protein} g</p>
                                                                        <p className="food_ingredientsContainer_contentContainer_text">Proteínas</p>
                                                                    </div>
                                                                    <div className="food_ingredientsContainer_contentContainer">
                                                                        <p className="food_ingredientsContainer_contentContainer_textQuantity">{ingredient.fat} g</p>
                                                                        <p className="food_ingredientsContainer_contentContainer_text">Grasas</p>
                                                                    </div>
                                                                    <div className="food_ingredientsContainer_contentContainer">
                                                                        <p className="food_ingredientsContainer_contentContainer_textQuantity">{ingredient.sugar} g</p>
                                                                        <p className="food_ingredientsContainer_contentContainer_text">Azúcares</p>
                                                                    </div>
                                                                    <div className="food_ingredientsContainer_contentContainer">
                                                                        <p className="food_ingredientsContainer_contentContainer_textQuantity">{ingredient.carbs} g</p>
                                                                        <p className="food_ingredientsContainer_contentContainer_text">Carbohidratos</p>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <p className="dietContainer_text">No se encontraron nutrientes</p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default DashboardFood
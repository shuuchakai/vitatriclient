import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from '../../../components/UI/Sidebar/Sidebar';

import './DashboardHome.css';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const preferencesOptions = ['Correr', 'Nadar', 'Yoga', 'Ciclismo', 'Pesas', 'Aerobics', 'Zumba', 'Calistenia'];

function DashboardHome() {
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState({
        age: 0,
        weight: 0,
        height: 0,
        biological_sex: '',
        gender: '',
        blood_type: '',
        physical_activity: '',
        schedule: [],
        preferences: '',
        allergies: [],
        diseases: [],
        medications: [],
        water_intake_amount: '',
        water_intake_unit: '',
        sleep_hours: 0,
        goal: '',
        specific_goal: ''
    });

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user === undefined || user === null) {
            navigate('/login');
        } else {
            console.log(user);
        }
    }, []);


    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const generateOptions = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handleSumbit = async (event) => {
        event.preventDefault();

        try {
            console.log('Form values:', formValues);

            if (step === 6) {
                const response = await axios.post(`https://vitatriserver-production.up.railway.app/api/questions/create`, { ...formValues, user_id: user.id })

                console.log('Response:', response);
                if (response.status === 201) {
                    navigate('/dashboard/settings');
                };
            } else {
                setStep(step + 1);
            };
        } catch (error) {
            console.log('Error:', error);
        };
    };

    return (
        <>
            <Sidebar />
            <main className="dashboard">
                <div className="dashboard_title">
                    <p className="dashboard_titleText">Antes de iniciar...</p>
                    <p className="dashboard_titleSubtitle">Necesitamos que respondas una serie de preguntas para generar tu perfil completo.</p>
                    <div className="dashboard_questionary">
                        <p className="dashboard_questionaryTitle">Pregunta {step}</p>
                        <div className="dashboard_questionaryContainer">
                            <form className="dashboard_questionaryForm" onSubmit={handleSumbit}>
                                {step === 1 && (
                                    <>
                                        <p className="dashboard_questionaryForm_title">Información Personal:</p>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Qué edad tienes?</label>
                                            <select
                                                className="dashboard_questionaryInput"
                                                value={formValues.age}
                                                onChange={(event) => setFormValues({ ...formValues, age: event.target.value })}
                                            >
                                                {generateOptions(12, 70).map((option) => (
                                                    <option className="dashboard_questionaryInput_option" key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="dashboard_questionaryText">años.</p>
                                        </div>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Cuál es tu peso?</label>
                                            <select
                                                className="dashboard_questionaryInput"
                                                value={formValues.weight}
                                                onChange={(event) => setFormValues({ ...formValues, weight: event.target.value })}
                                            >
                                                {generateOptions(25, 150).map((option) => (
                                                    <option className="dashboard_questionaryInput_option" key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="dashboard_questionaryText">kg.</p>
                                        </div>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Cuál es tu altura?</label>
                                            <select
                                                className="dashboard_questionaryInput"
                                                value={formValues.height}
                                                onChange={(event) => setFormValues({ ...formValues, height: event.target.value })}
                                            >
                                                {generateOptions(120, 200).map((option) => (
                                                    <option className="dashboard_questionaryInput_option" key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="dashboard_questionaryText">cm.</p>
                                        </div>
                                        <button className="dashboard_questionaryButton" type="submit">Siguiente</button>
                                    </>
                                )}
                                {step === 2 && (
                                    <>
                                        <p className="dashboard_questionaryForm_title">Información Personal:</p>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Cuál es tu sexo biológico?</label>
                                            <select
                                                className="dashboard_questionaryInput"
                                                value={formValues.biological_sex}
                                                onChange={(event) => setFormValues({ ...formValues, biological_sex: event.target.value })}
                                            >
                                                <option value="">Selecciona tu sexo biológico</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                            </select>
                                        </div>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Con qué génerote identificas?</label>
                                            <select
                                                className="dashboard_questionaryInput"
                                                value={formValues.gender}
                                                onChange={(event) => setFormValues({ ...formValues, gender: event.target.value })}
                                            >
                                                <option value="">Selecciona tu género</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                                <option value="No binario">No binario</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                        <div className="dashboard_questionary_buttonContainer">
                                            <button className="dashboard_questionaryButton" type="button" onClick={handleBack}>Atrás</button>
                                            <button className="dashboard_questionaryButton" type="submit">Siguiente</button>
                                        </div>
                                    </>
                                )}
                                {step === 3 && (
                                    <>
                                        <p className="dashboard_questionaryForm_title">Información Física:</p>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Realizas actividad física?</label>
                                            <select
                                                className="dashboard_questionaryInput"
                                                value={formValues.physical_activity}
                                                onChange={(event) => setFormValues({ ...formValues, physical_activity: event.target.value })}
                                            >
                                                <option value="">Selecciona una opción</option>
                                                <option value="Sí">Sí</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>

                                        {formValues.physical_activity === 'Sí' && (
                                            <>
                                                <div className="dashboard_questionaryForm_inputContainer">
                                                    <label className="dashboard_questionaryLabel">¿Qué días realizas actividad física?</label>
                                                    {daysOfWeek.map((day) => (
                                                        <div key={day}>
                                                            <input
                                                                className="dashboard_questionaryInputCheck"
                                                                type="checkbox"
                                                                id={`day-${day}`}
                                                                value={day}
                                                                checked={formValues.schedule.some(s => s.day === day)}
                                                                onChange={(event) => {
                                                                    const checked = event.target.checked;
                                                                    setFormValues(prevValues => {
                                                                        if (checked) {
                                                                            return { ...prevValues, schedule: [...prevValues.schedule, { day, time: '' }] };
                                                                        } else {
                                                                            return { ...prevValues, schedule: prevValues.schedule.filter(s => s.day !== day) };
                                                                        }
                                                                    });
                                                                }}
                                                            />
                                                            <label className="dashboard_questionaryLabel" htmlFor={`day-${day}`}>{day}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                                {formValues.schedule.map((scheduleItem, index) => (
                                                    <div key={index} className="dashboard_questionaryForm_inputContainer">
                                                        <label className="dashboard_questionaryLabel">¿A qué hora realizas actividad física el {scheduleItem.day}?</label>
                                                        <input
                                                            type="time"
                                                            className="dashboard_questionaryInput"
                                                            value={scheduleItem.time}
                                                            onChange={(event) => {
                                                                const newSchedule = [...formValues.schedule];
                                                                newSchedule[index].time = event.target.value;
                                                                setFormValues({ ...formValues, schedule: newSchedule });
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Tienes alguna preferencia al realizar ejercicio?</label>
                                            {preferencesOptions.map((preference, index) => (
                                                <div key={index}>
                                                    <input
                                                        className="dashboard_questionaryInputCheck"
                                                        type="checkbox"
                                                        id={`preference-${index}`}
                                                        value={preference}
                                                        checked={formValues.preferences.includes(preference)}
                                                        onChange={(event) => {
                                                            const checked = event.target.checked;
                                                            setFormValues(prevValues => {
                                                                if (checked && prevValues.preferences.length < 3) {
                                                                    return { ...prevValues, preferences: [...prevValues.preferences, preference] };
                                                                } else if (!checked) {
                                                                    return { ...prevValues, preferences: prevValues.preferences.filter(p => p !== preference) };
                                                                } else {
                                                                    return prevValues;
                                                                }
                                                            });
                                                        }}
                                                    />
                                                    <label className="dashboard_questionaryLabel" htmlFor={`preference-${index}`}>{preference}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="dashboard_questionary_buttonContainer">
                                            <button className="dashboard_questionaryButton" type="button" onClick={handleBack}>Atrás</button>
                                            <button className="dashboard_questionaryButton" type="submit">Siguiente</button>
                                        </div>
                                    </>
                                )}
                                {step === 4 && (
                                    <>
                                        <p className="dashboard_questionaryForm_title">Información Médica:</p>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Cuál es tu tipo de sangre?</label>
                                            <select
                                                className="dashboard_questionaryInput"
                                                value={formValues.blood_type}
                                                onChange={(event) => setFormValues({ ...formValues, blood_type: event.target.value })}
                                            >
                                                <option value="">Selecciona tu tipo de sangre</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </select>
                                        </div>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Tienes alguna alergia? En caso de tener, especificar</label>
                                            <input
                                                className="dashboard_questionaryInput"
                                                type="text"
                                                value={formValues.allergies}
                                                onChange={(event) => setFormValues({ ...formValues, allergies: event.target.value })}
                                            />
                                        </div>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Tienes alguna enfermedad? En caso de tener, especificar</label>
                                            <input
                                                className="dashboard_questionaryInput"
                                                type="text"
                                                value={formValues.diseases}
                                                onChange={(event) => setFormValues({ ...formValues, diseases: event.target.value })}
                                            />
                                        </div>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Tomas algún medicamento? En caso de tomar, especificar</label>
                                            <input
                                                className="dashboard_questionaryInput"
                                                type="text"
                                                value={formValues.medications}
                                                onChange={(event) => setFormValues({ ...formValues, medications: event.target.value })}
                                            />
                                        </div>
                                        <div className="dashboard_questionary_buttonContainer">
                                            <button className="dashboard_questionaryButton" type="button" onClick={handleBack}>Atrás</button>
                                            <button className="dashboard_questionaryButton" type="submit">Siguiente</button>
                                        </div>
                                    </>
                                )}
                                {step === 5 && (
                                    <>
                                        <p className="dashboard_questionaryForm_title">Hábitos:</p>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Cuántos cantidad de agua consumes al día?</label>
                                            <select
                                                className="dashboard_questionaryInput"
                                                value={formValues.water_intake_amount}
                                                onChange={(event) => setFormValues({ ...formValues, water_intake_amount: event.target.value, water_intake: event.target.value + ' ' + formValues.water_intake_unit })}
                                            >
                                                <option value="">Selecciona una opción</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                            </select>
                                            <select
                                                className="dashboard_questionaryInput"
                                                value={formValues.water_intake_unit}
                                                onChange={(event) => setFormValues({ ...formValues, water_intake_unit: event.target.value, water_intake: formValues.water_intake_amount + ' ' + event.target.value })}
                                            >
                                                <option value="">Selecciona una opción</option>
                                                <option value="vaso">vaso</option>
                                                <option value="litro">litro</option>
                                            </select>
                                        </div>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Cuántas horas duermes al día?</label>
                                            <select
                                                className="dashboard_questionaryInput"
                                                value={formValues.sleep_hours}
                                                onChange={(event) => setFormValues({ ...formValues, sleep_hours: event.target.value })}
                                            >
                                                {generateOptions(1, 12).map((option) => (
                                                    <option className="dashboard_questionaryInput_option" key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="dashboard_questionaryText">horas.</p>
                                        </div>
                                        <div className="dashboard_questionary_buttonContainer">
                                            <button className="dashboard_questionaryButton" type="button" onClick={handleBack}>Atrás</button>
                                            <button className="dashboard_questionaryButton" type="submit">Siguiente</button>
                                        </div>
                                    </>
                                )}
                                {step === 6 && (
                                    <>
                                        <p className="dashboard_questionaryForm_title">Objetivos:</p>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">¿Cuál es tu objetivo?</label>
                                            <select
                                                className="dashboard_questionaryInput"
                                                value={formValues.goal}
                                                onChange={(event) => setFormValues({ ...formValues, goal: event.target.value })}
                                            >
                                                <option value="">Selecciona una opción</option>
                                                <option value="Perder peso">Perder peso</option>
                                                <option value="Ganar peso">Ganar peso</option>
                                                <option value="Mantener peso">Mantener peso</option>
                                            </select>
                                        </div>
                                        <div className="dashboard_questionaryForm_inputContainer">
                                            <label className="dashboard_questionaryLabel">Describe de forma breve que buscar lograr:</label>
                                            <textarea
                                                className="dashboard_questionaryInput"
                                                value={formValues.specific_goal}
                                                onChange={(event) => setFormValues({ ...formValues, specific_goal: event.target.value })}
                                                maxLength={100}
                                            />
                                        </div>
                                        <div className="dashboard_questionary_buttonContainer">
                                            <button className="dashboard_questionaryButton" type="button" onClick={handleBack}>Atrás</button>
                                            <button className="dashboard_questionaryButton" type="submit">Enviar</button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default DashboardHome;
import { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from "../../../components/UI/Sidebar/Sidebar";

import './DashboardProfile.css';

function DashboardProfile() {
    const user = JSON.parse(localStorage.getItem('user'));

    const [response, setResponse] = useState(JSON.parse(localStorage.getItem('response')));

    useEffect(() => {
        if (user === undefined) {
            navigate('/login');
        } else {
            const { id } = user;

            if (!response) {
                axios.post(`https://vitatriserver-production.up.railway.app/api/questions/get`, { id_user: id })
                    .then(res => {
                        setResponse(res);
                        localStorage.setItem('response', JSON.stringify(res));
                    })
                    .catch(err => console.error(err));
            }
        }

    }, [user, response]);

    const data = response?.data[0];
    console.log(data);

    return (
        <>
            <Sidebar />
            <main className="profile">
                <div className="profile_title">
                    <p className="dashboard_titleText">vitatri's<span>ccount</span></p>
                    <p className="profile_titleSubtext">Perfil</p>
                </div>
                {data && (

                    <div className="profile_contentContainer">
                        
                        <div className="profile_contentText">Edad: <span>{data.age}</span></div>
                        <div className="profile_contentText">Peso: <span>{data.weight}</span>kg</div>
                        <div className="profile_contentText">Altura: <span>{data.height}</span>cm</div>
                        <div className="profile_contentText">Horas de sueño: <span>{data.sleep_hours}</span></div>
                        <div className="profile_contentText">Meta principal: <span>{data.goal}</span></div>
                        <div className="profile_contentText">Meta más específica: <span>{data.specific_goal}</span></div>
                        <div className="profile_contentText">Actividad física: <span>{data.physical_activity}</span></div>
                        <div className="profile_contentText">Tipo de sangre: <span>{data.blood_type}</span></div>
                        <div className="profile_contentText">Alergias: <span>{data.allergies}</span></div>
                        <div className="profile_contentText">Enfermedades: <span>{data.diseases}</span></div>
                        <div className="profile_contentText">Medicamentos: <span>{data.medications}</span></div>
                        <div className="profile_contentText">Preferencias: <span>{data.preferences}</span></div>
                        <div className="profile_contentText">
                            Qué días haces ejercicio y a que hora:
                            {data.schedule.map((item, index) => (
                                <div className="profile_contentText" key={index}>
                                    <span>{item.day}</span> - <span>{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default DashboardProfile
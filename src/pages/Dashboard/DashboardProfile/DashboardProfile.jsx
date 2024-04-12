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
                axios.post('http://localhost:3000/api/questions/get', { id_user: id })
                    .then(res => {
                        setResponse(res);
                        localStorage.setItem('response', JSON.stringify(res));
                    })
                    .catch(err => console.error(err));
            }
        }

    }, [user, response]);

    const data = response?.data[0];

    return (
        <>
            <Sidebar />
            <main className="profile">
                <div className="profile_title">
                    <p className="dashboard_titleText">vitatri's<span>ccount</span></p>
                    <p className="profile_titleSubtext">Perfil</p>
                </div>
                <div className="profile_content">
                    <div className="profile_contentTitle">{user.name}</div>
                    <div className="profile_contentSubtitle">{data.gender}</div>
                    <div className="profile_contentText">{data.age}</div>
                    <div className="profile_contentText">{data.weight}</div>
                    <div className="profile_contentText">{data.height}</div>
                    <div className="profile_contentText">{data.sleep_hours}</div>
                </div>
            </main>
        </>
    )
}

export default DashboardProfile
import { Link, useNavigate } from 'react-router-dom';

import './Sidebar.css';

const logout = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
    </svg>
);

const home = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
            d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
    </svg>
);

const food = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
            d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z" />
    </svg>
);

const stats = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
            d="m105-233-65-47 200-320 120 140 160-260 109 163q-23 1-43.5 5.5T545-539l-22-33-152 247-121-141-145 233ZM863-40 738-165q-20 14-44.5 21t-50.5 7q-75 0-127.5-52.5T463-317q0-75 52.5-127.5T643-497q75 0 127.5 52.5T823-317q0 26-7 50.5T795-221L920-97l-57 57ZM643-217q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm89-320q-19-8-39.5-13t-42.5-6l205-324 65 47-188 296Z" />
    </svg>
);

const profile = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
            d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
    </svg>
);

const shoes = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
            d="M216-580q39 0 74 14t64 41l382 365h24q17 0 28.5-11.5T800-200q0-8-1.5-17T788-235L605-418l-71-214-74 18q-38 10-69-14t-31-63v-84l-28-14-154 206q-1 1-1 1.5t-1 1.5h40Zm0 80h-46q3 7 7.5 13t10.5 11l324 295q11 11 25 16t29 5h54L299-467q-17-17-38.5-25t-44.5-8ZM566-80q-30 0-57-11t-50-31L134-417q-46-42-51.5-103T114-631l154-206q17-23 45.5-30.5T368-861l28 14q21 11 32.5 30t11.5 42v84l74-19q30-8 58 7.5t38 44.5l65 196 170 170q20 20 27.5 43t7.5 49q0 50-35 85t-85 35H566Z" />
    </svg>
);

function Sidebar() {

    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('user');
        localStorage.removeItem('response');

        navigate('/login');
    }

    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="sidebar_container">
                <Link to="/dashboard" className="sidebar_containerTitle">vitatri's<span className="sidebar_containerTitleSpan">board</span></Link>
                <div className="sidebar_containerMenu">
                    <Link to="/dashboard" className="sidebar_containerMenuItem">{home}Inicio</Link>
                    <Link to="/dashboard/food" className="sidebar_containerMenuItem">{food}Recetas</Link>
                    {/* <Link to="/dashboard/fitness" className="sidebar_containerMenuItem">{shoes}Ejercicio</Link>
                    <Link to="/dashboard/stats" className="sidebar_containerMenuItem">{stats}Estadísticas</Link> */}
                    <Link to="/dashboard/settings" className="sidebar_containerMenuItem">{profile}Perfil</Link>
                </div>
                <p onClick={handleLogout} className="sidebar_containerLogoutButton">{logout}Cerrar sesión</p>
            </div>
        </div>
    )
}

export default Sidebar
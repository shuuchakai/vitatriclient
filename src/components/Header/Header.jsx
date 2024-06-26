import { Link } from "react-router-dom";

import './Header.css';

function Header() {
    const token = localStorage.getItem('token');

    const isAuthenticated = token ? true : false;

    return (
        <header className="header">
            <div className="header_container">
                <nav className="header_containerLinks">
                    <Link to="/" className="header_containerTitle">vitatri</Link>
                    <Link to="/blog" className="header_containerLinks_link">Blog</Link>
                    <Link to="/us" className="header_containerLinks_link">Nosotros</Link>
                    <Link to="/contact" className="header_containerLinks_link">Contacto</Link>
                </nav>
                <div className="header_containerButtons">
                    {isAuthenticated ? (
                        <Link to="/dashboard" className="header_containerButtons_signup">Dashboard</Link>
                    ) : (
                        <>
                            <Link to="/signup" className="header_containerButtons_signup">Crear Cuenta</Link>
                            <Link to="/login" className="header_containerButtons_login">Iniciar Sesión</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;
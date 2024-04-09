import { Link } from "react-router-dom";

function Header() {
    const token = localStorage.getItem('token');

    const isAuthenticated = token ? false : true;

    return (
        <header className="header">
            <div className="header_container">
                <nav className="header_containerLinks">
                    <p className="header_containerTitle">vitatri</p>
                    <Link to="/blog" className="header_containerLinks_link">Blog</Link>
                    <Link to="/us" className="header_containerLinks_link">Nosotros</Link>
                    <Link to="/contact" className="header_containerLinks_link">Contacto</Link>
                </nav>
                <div className="header_containerButtons">
                    {isAuthenticated ? (
                        <Link to="/dashboard" className="header_containerButtons_dashboard">Dashboard</Link>
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
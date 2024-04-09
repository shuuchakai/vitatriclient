import { Link } from 'react-router-dom';

import MainHeader from '../../Components/MainHeader/MainHeader';

import './HomePage.css';

function HomePage() {
    return (
        <>
            <MainHeader />
            <main className="homepage">
                <section className="homepage_firstSection">
                    <div className="homepage_firstSection_left">
                        <p className="homepage_firstSection_leftTitle">Transforma Minutos en Bienestar</p>
                        <p className="homepage_firstSection_leftDescription">Con Vitatri, el poder de una vida saludable está en tus manos. Diseñado para quienes valoran cada minuto, nuestro software te ofrece planes de dieta y ejercicio personalizados, respaldados por la ciencia y ¡que no te quitan minutos de más!</p>
                        <button className="homepage_firstSection_leftButton">
                            ¿Quiéres mejorar tu bienestar?&nbsp;
                            <Link to="/register" className="homepage_firstSection_leftButton_span">Empieza ahora</Link>
                        </button>
                    </div>
                    <div className="homepage_firstSection_right">hola</div>
                </section>
            </main>
        </>
    )
}

export default HomePage
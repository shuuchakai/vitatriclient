import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import * as yup from 'yup';
import axios from 'axios';

import './Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const fetchQuoteAndGif = async () => {
            try {
                const quoteResponse = await axios.get('https://api.quotable.io/random');
                setQuote(`"${quoteResponse.data.content}" - ${quoteResponse.data.author}`);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuoteAndGif();
    }, []);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es requerido'),
        email: yup.string().min(2, 'El correo electrónico es requerido').matches(/\S+@(gmail|hotmail|outlook)\.(com|es)$/, 'El correo electrónico no es válido').required('El correo electrónico es requerido'),
        password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, 'La contraseña debe tener entre 8 y 20 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial').required('La contraseña es requerida'),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fields = ['name', 'email', 'password'];
        let errors = {};

        for (const field of fields) {
            try {
                await schema.validateAt(field, { [field]: eval(field) });
            } catch (error) {
                if (error instanceof yup.ValidationError) {
                    errors[field] = error.message;
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
        } else {
            try {
                const response = await axios.post('http://localhost:3000/api/users/register', { name, email, password });

                console.log(response.data);
                navigate('/verifyEmail');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="signup">
            <div className="signup_left">
                <p className="signup_leftQuote">{quote}</p>
            </div>
            <div className="signup_right">
                <div className="signup_rightContainer">
                    <div className="signup_rightTop">
                        <p className="signup_rightTop_title">vitatri</p>
                        <p className="signup_rightTop_subtitle">¡Bienvenido, crea una cuenta y empieza a cuidar de tu salud!</p>
                    </div>
                    <form className="signup_rightMiddle" onSubmit={handleSubmit}>
                        <div className="signup_rightMiddle_form_inputContainer">
                            <label className="signup_rightMiddle_form_inputContainer_label">Nombre:</label>
                            <input
                                className="signup_rightMiddle_form_inputContainer_input"
                                type="text"
                                placeholder="Introduce tu nombre"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <p className="signup_rightMiddle_form_inputContainer_error">{error && error.name}</p>
                        </div>
                        <div className="signup_rightMiddle_form_inputContainer">
                            <label className="signup_rightMiddle_form_inputContainer_label">Correo Electrónico:</label>
                            <input
                                className="signup_rightMiddle_form_inputContainer_input"
                                type="text"
                                placeholder="Introduce tu correo electrónico"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <p className="signup_rightMiddle_form_inputContainer_error">{error && error.email}</p>
                        </div>
                        <div className="signup_rightMiddle_form_inputContainer">
                            <label className="signup_rightMiddle_form_inputContainer_label">Contraseña:</label>
                            <input
                                className="signup_rightMiddle_form_inputContainer_input"
                                type="password"
                                placeholder="Introduce tu contraseña"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <p className="signup_rightMiddle_form_inputContainer_error">{error && error.password}</p>
                        </div>
                        <button className="signup_rightMiddle_form_button" type="submit">Crear Cuenta</button>
                    </form>
                    <div className="signup_rightBottom">
                        <p className="signup_rightMiddle_signin">¿Ya tienes una cuenta?</p>
                        <Link to="/login" className="signup_rightMiddle_signinSpan">Inicia Sesión</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
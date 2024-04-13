import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

import Image from '../../../assets/login.svg';

import './Login.css';
import '../Signup/Signup.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().min(2, "El correo es requerido").matches(/\S+@(gmail|hotmail|outlook)\.(com|es)$/, 'El correo electrónico no es válido').required('El correo electrónico es requerido'),
        password: yup.string().min(8, "La contraseña es requerida").max(20).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\\+])[A-Za-z\d@$!%*?&\\+]{8,20}$/, 'La contraseña debe tener entre 8 y 20 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial').required('La contraseña es requerida'),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fields = ['email', 'password'];
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
                const response = await axios.post(`https://vitatriserver-production.up.railway.app/api/users/login`, { email, password });

                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);

                toast('Inicio de sesión correcto', {
                    style: {
                        background: "#F9F8F1",
                        color: "#204948",
                        padding: "16px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                    },
                    duration: 3000
                });

                setInterval(() => {
                    navigate('/dashboard');
                }, 3000);
            } catch (error) {
                setError({ email: 'Correo electrónico o contraseña incorrectos', password: 'Correo electrónico o contraseña incorrectos' });
            }
        }
    }

    return (
        <>
            <div className="signup">
                <div className="signup_left">
                    <p className="signup_leftTitle">!Bienvenido de vuelta¡</p>
                    <img className="signup_leftImageLogin" src={Image} alt="signup" />
                    <p className="signup_leftQuote">Inicia sesión y empieza a controlar tu bienestar</p>
                </div>
                <div className="signup_right">
                    <div className="signup_rightContainer">
                        <div className="signup_rightTop">
                            <p className="signup_rightTop_title">vitatri</p>
                            <p className="signup_rightTop_subtitle">Inicia sesión con tu cuenta.</p>
                        </div>
                        <form className="signup_rightMiddle" onSubmit={handleSubmit}>
                            <div className="signup_rightMiddle_form_inputContainer">
                                <label className="signup_rightMiddle_form_inputContainer_label">Correo electrónico:</label>
                                <input
                                    className="signup_rightMiddle_form_inputContainer_input"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                {error && <p className="signup_rightMiddle_form_inputContainer_error">{error.email}</p>}
                            </div>
                            <div className="signup_rightMiddle_form_inputContainer">
                                <label className="signup_rightMiddle_form_inputContainer_label">Contraseña:</label>
                                <input
                                    className="signup_rightMiddle_form_inputContainer_input"
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                {error && <p className="signup_rightMiddle_form_inputContainer_error">{error.password}</p>}
                            </div>
                            <button className="signup_rightMiddle_form_button" type='submit'>Iniciar Sesión</button>
                        </form>
                        <div className="signup_rightBottom">
                            <p className="signup_rightMiddle_signin">¿No tienes una cuenta?</p>
                            <Link className="signup_rightMiddle_signinSpan" to="/signup">Regístrate</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="bottom-left" />
        </>
    )
}

export default Login
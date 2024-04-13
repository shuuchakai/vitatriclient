import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useState } from 'react';
import axios from 'axios';

import './VerifyEmail.css';

function VerifyEmail() {
    const [token, setToken] = useState('');

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    console.log(user);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`https://vitatriserver-production.up.railway.app/api/users/confirm`, { email: user.email, token });

            localStorage.setItem('token', response.data.token);

            toast('Correo electrónico verificado correctamente', {
                style: {
                    background: "#F9F8F1",
                    color: "#204948",
                    padding: "16px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                },
                duration: 3000
            });

            console.log(token);
            console.log(response.data);

            setInterval(() => {
                navigate('/dashboard');
            }, 3000)

            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="verifyEmail">
                <form className="verifyEmail_form" onSubmit={handleSubmit}>
                    <p className="verifyEmail_logo">vitatri</p>
                    <p className="verifyEmail_title">Verificar Correo Electrónico</p>
                    <div className="verifyEmail_inputContainer">
                        <label className="verifyEmail_inputContainer_label">Ingresa el código de 6 dígitos enviado a tu correo electrónico</label>
                        <input
                            className="verifyEmail_inputContainer_input"
                            type="text"
                            placeholder="Introduce el código"
                            value={token}
                            onChange={(event) => {
                                const value = event.target.value;
                                if (value.length <= 6 && /^[0-9]*$/.test(value)) {
                                    setToken(value);
                                }
                            }}
                        />
                    </div>
                    <button className="verifyEmail_button" type="submit">Verificar</button>
                </form>
            </div>
            <Toaster position='bottom-left' />
        </>
    )
}

export default VerifyEmail
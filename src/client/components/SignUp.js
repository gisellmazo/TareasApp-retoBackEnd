import React, { useEffect, useState  } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from "./FormField";
import '../styles/signup.css';

export default function SignUp(props) {
    const [datos, setdatos] = useState([{}])

    useEffect(() => {
        fetch('/signup')
            .then(response => response.json())
            .then(data => setdatos(data));
            console.log(datos)
    }, [])

    const validate = Yup.object({
        email: Yup.string().required('Correo es requerido'),
        user: Yup.string().required('Usuario es requerido'),
        password: Yup.string().required('Contraseña requerida')
      });
    return (
        <div className="signup">
            <div className="signupForm">
                <h2 className="register">Registro de Usuario</h2>
                <h2 className="titleTareas">TareasApp</h2>

                <Formik
                    initialValues={{
                        email: '',
                        user: '',
                        password: '',
                    }}
                    validationSchema={validate}
                    onSubmit={(values) => {
                        console.log(values);
                    }}>
                    {(formik) => (
                        <form action="/users/signup" method="post" >
                            <label htmlFor="email" className="label"><FontAwesomeIcon icon={faEnvelope} /> Correo:</label>
                            <input
                                type="text"
                                name="email"
                                className="formField" />

                            <label htmlFor="password" className="label"><FontAwesomeIcon icon={faLock} /> Contraseña:</label>
                            <input
                                type="password"
                                name="password"
                                className="formField" />

                            <button className="btnSignup">Regístrarse</button>

                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
import React, { Component } from "react";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from "./FormField";
import '../styles/login.css';


export default function Login(props){

  

    const validate = Yup.object({
        user: Yup.string().required('Usuario es requerido'),
        password: Yup.string().required('Contraseña requerida')
      });
    return(
    <body className="login">
        <div className="loginForm">

            <h2 className="titleTareas">TareasApp</h2>
        
            <Formik
            initialValues={{
              user: '',
              password: '',
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              console.log(values);
            }}>
            {(formik) => (
             <Form>
                <label htmlFor="user" className="label"><FontAwesomeIcon icon={faUser} /> Usuario:</label>
                <FormField
                type="text"
                name="user"
                className="formField"/>

                <label htmlFor="password" className="label"><FontAwesomeIcon icon={faLock} /> Contraseña:</label>
                <FormField
                type="text"
                name="password"
                className="formField"/>

                <button className="btnLogin">Iniciar Sesión</button>

                <p className="registerText">
                    No estas registrado? <Link to="/signup" rel="noopener noreferrer"className="register">Regístrate</Link>
                  </p>
                </Form>
                )}
            </Formik>
        </div>
    </body>
  )
}
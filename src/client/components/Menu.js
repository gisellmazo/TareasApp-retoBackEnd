import React, { Component } from "react";
import '../styles/menu.css';

export default function Login(props){
    return(
    <div className="menu">
        <div>
            <h1 className="appName">TareasApp</h1>
        </div>
        <div>
            <button className="btnLogOut">Cerrar Sesión</button>
        </div>
    </div>
  )
}
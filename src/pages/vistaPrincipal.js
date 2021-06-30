import React from "react";
import NavBar from "../componentes/navBar";
import Logo from "../componentes/logo";
import PosicionUserCardInfo from "../componentes/posicionUserCardInfo";


class VistaPrincipal extends React.Component{
    constructor() {
        super();


    }



    render() {
        return (
             <div>
                <div className="container-card">

                    <div className="card-info">
                        <Logo/>
                        <div className="info">
                            <h1> Edita tus fotos en tiempo real<br/> con tus amigos</h1>
                            <p>Escoge a tus amigos donde quieran que esten </p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1508153460964-48ffffcb0829?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="map" className="imgaen" width="100%" height="100%"/>
                    </div>
                    <div className="card-login">
                        <div className="titulo">
                            <h2>Hola! Bienvenido a TokkioEdit</h2>
                            <p>No tienes cuenta? <a href="/signUp">Crear cuenta</a></p>
                        </div>
                        <div className="form">
                            <label for="">Correo</label>
                            <input type="text" placeholder="ingrese su correo"/>
                            <label htmlFor="">Password</label>
                            <input type="text" placeholder="ingrese su password"/>
                        </div>
                        <div className="contenedor-button">
                            <button className="button-inicio">Iniciar</button>
                        </div>
                    </div>
                </div>
             </div>
        );
    }
}

export default VistaPrincipal;
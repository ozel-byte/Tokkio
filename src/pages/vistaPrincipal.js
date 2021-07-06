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
            <div className="container">
                <div className="card-one">
                    <div className="posicioncard">
                        <div><img src="src/imgs/picture.png" alt="" /></div>
                        <div>
                            <h2>TokkioEdit</h2>
                        </div>
                        <div className="information">
                            <h1> Edita tus fotos en tiempo real<br/> con tus amigos</h1>
                            <p>Escoge a tus amigos donde quieran que esten </p>
                        </div>
                    </div>
                </div>
                <div className="card-two">
                    <div className="container-form">
                        <div className="card-form">
                            <div className="text-form">
                                <h2>Hola! <br/> Bienvenido a TokkioEdit</h2>
                                <p>No tienes cuenta? <a href="/signUp">Crear cuenta</a></p>
                            </div>
                            <div className="formulario">
                                <input type="text" placeholder="Ingrese su correo" className="input-class"/>
                                <input type="text" placeholder="Ingrese su password"/>
                            </div>
                            <div>
                                <button className="button-iniciar">Iniciar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VistaPrincipal;
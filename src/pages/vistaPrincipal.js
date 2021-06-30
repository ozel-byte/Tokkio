import React from "react";
import NavBar from "../componentes/navBar";
import Logo from "../componentes/logo";
import PosicionUserCardInfo from "../componentes/posicionUserCardInfo";


class VistaPrincipal extends React.Component{
    render() {
        return (
             <div>
                <div className="container-card">
                    <div className="card-info">
                        <div>
                            <Logo/>
                        </div>
                        <img src="src/imgs/map.png" alt="map" srcset="" width="100%" height="300px"/>
                        <PosicionUserCardInfo ubicacion="posicion-img" ubicacionLine="line"/>
                        <PosicionUserCardInfo ubicacion="posicion-img2" ubicacionLine="line2"/>
                    </div>
                    <div className="card-login">
                        <div className="titulo">
                            <h2>Inicio de sesion</h2>
                            <p>No tienes cuenta? <a>Crear cuenta</a></p>
                        </div>
                        <div className="form">
                            <input type="text" placeholder="ingrese su correo"/>
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
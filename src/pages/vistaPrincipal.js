import React from "react";
import NavBar from "../componentes/navBar";
import Logo from "../componentes/logo";


class VistaPrincipal extends React.Component{
    render() {
        return (
             <div>
                <div className="fondo-page">
                   <div className="fondo-img">
                       <img src="src/imgs/img2.jpg" alt="" />
                   </div>
                    <div className="container">
                        <div className="logo">
                            <Logo/>
                        </div>
                        <div className="container-form">
                            <div className="card">
                               <div>
                                   <h1>Inicio de sesion</h1>
                                   <p>Eres nuevo usuario? <a href="">Crear una Cuenta</a></p>
                               </div>
                                <div className="form">
                                    <label for="">ingrese un username</label><br/>
                                    <input type="text" placeholder="username" />
                                </div>
                               <div>
                                   <button className="button-start">Iniciar sesion</button>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        );
    }
}

export default VistaPrincipal;
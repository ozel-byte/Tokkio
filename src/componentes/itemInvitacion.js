import React from "react";

class ItemInvitacion extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="item">
                <img src="https://cdn.dribbble.com/users/126602/screenshots/15408374/media/1fc1614c898ced52c23ab9586027ca39.jpg?compress=1&resize=1000x750" id="imagenUsuario"/>
                <div className="textoInvitacion">
                    <h4>Kevin</h4>
                    <p>Te ha invitado</p>
                </div>
                <div className="botonesInvitacion">
                    <div>
                        <div>
                            <button id="btnAceptar">Aceptar</button>
                        </div>
                        <div>
                            <button id="btnRechazar">Rechazar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemInvitacion;
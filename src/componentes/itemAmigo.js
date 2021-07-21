import React from "react";

class ItemAmigo extends React.Component {
    render() {
        return(
            <div className="item2">
                <div className="datosAmigo">
                    <div id="centrarImagen">
                        <img src={this.props.user.imgUser} id="imagenAmigo"/>
                    </div>
                </div>
                <div className="divBotonesListaAmigos">
                    <div id="divDatosIzq">
                        <div className="centrarNombreAmigo">
                            <h2>{this.props.user.user}</h2>
                        </div>
                        <br/>
                        <div className="centrarBotonInv">
                            <button className="botonInvitar">Invitar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemAmigo;
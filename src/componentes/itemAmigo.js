import React from "react";

class ItemAmigo extends React.Component {
    render() {
        return(
            <div className="item2">
                <div className="datosAmigo">
                    <div id="centrarImagen">
                        <img src="https://cdn.dribbble.com/users/1044993/screenshots/15867113/media/cfb373d2a0a5d686b612ab54d1f482a3.png?compress=1&resize=1000x750" id="imagenAmigo"/>
                    </div>
                </div>
                <div className="divBotonesListaAmigos">
                    <div id="divDatosIzq">
                        <div className="centrarNombreAmigo">
                            <h2>this.props.name</h2>
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
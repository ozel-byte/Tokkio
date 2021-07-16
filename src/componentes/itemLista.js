import React from "react";

class ItemLista extends React.Component {
    render() {
        return(
            <div className="item">
                <img src="https://images.unsplash.com/photo-1542596594-649edbc13630?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" id="imagenUsuario"/>
                <div className="nombreUsuario">
                    <h2 className="colorNombre">{this.props.nombre}</h2>
                    <p>Conectado</p>
                </div>
            </div>
        )
    }
}

export default ItemLista;
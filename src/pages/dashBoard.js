import React from "react";
import CampoEdicionImagen from "../componentes/campoEdicionImagen";
import ListaUsuarios from "../componentes/listaUsuarios";
import HerramientasEdicion from "../componentes/herramientasEdicion";

class DashBoard extends React.Component {
    render() {
        return(
            <div>
                <div className="contenerPadre">
                    <div className="listaUsuario">
                        <ListaUsuarios/>
                    </div>
                    <div className="imagenEdit">
                        <CampoEdicionImagen/>
                    </div>
                    <div className="herramientas">
                        <HerramientasEdicion/>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashBoard;
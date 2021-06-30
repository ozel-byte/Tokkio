import React from "react";
import ItemLista from "./itemLista";

class ListaUsuarios extends React.Component {

    constructor(props) {
        super();
        this.state = {
            arreglo : [
                'Ozel', 'Bryan', 'Kevin', 'El otro Kevin', 'Pancrasia'
            ]
        }

    }

    render() {
        return (
            <div>
                <div className="datosUsuario">
                    <ItemLista nombre="Soy yo"/>
                </div>
                <div className="amigosEditand">
                    <br/>
                    <h1 className="colorTexto">Amigos en edición</h1>
                    <div>
                        <ul>
                            <li>
                                <ItemLista nombre="Omar"/>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <ItemLista nombre="Magin"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="listaConectados">

                   <div className="padreBarra">
                       <div className="buscador">
                           <input type="text" className="barraBusqueda" placeholder="Buscar amigos..."/>
                       </div>
                   </div>

                    {
                        this.state.arreglo.map(item =>{
                            return <ul>
                                <li>
                                    <ItemLista nombre={item}/>
                                </li>
                            </ul>
                        })
                    }
                </div>
            </div>
        )
    }

}

export default ListaUsuarios;
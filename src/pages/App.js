import React from "react";
import Logo from "../componentes/logo";
import AgregarImagen from "./agregarImagen";

class App extends React.Component{
    constructor(props){
        super(props);
    
    }
    render(){
       
        return(
            <div>
              <Logo />
                <AgregarImagen/>
            </div>
        )
    }
}

export default App;
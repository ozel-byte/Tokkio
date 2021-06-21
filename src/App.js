import React from "react";
import Logo from "../src/componentes/logo";

class App extends React.Component{
    constructor(props){
        super(props);
    
    }

    render(){
       
        return(
            <div>
              <Logo />
            </div>
        )
    }
}

export default App;
import React from "react";
import AgregarImagen from "./agregarImagen";
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import VistaPrincipal from "./vistaPrincipal";
import Logo from "../componentes/logo";
import DashBoard from "./dashBoard";
class App extends React.Component{
    constructor(props){
        super(props);
    
    }
    render(){
        return(
           <Router>
               <Route exact path="/" >
                   <DashBoard/>
               </Route>
               <Route exact path="/Logo" >
                   <Logo/>
               </Route>
           </Router>
        )
    }
}

export default App;
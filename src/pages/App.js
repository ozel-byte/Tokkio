import React from "react";
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import SignUp from "./signUp";
import SignIn from "./signIn";
import Splascreen from "./splascreen";
import Presentacion from "./presentacion";
import Home from "./home";
class App extends React.Component{
    constructor(props){
        super(props);
    
    }
    render(){
        return(
           <Router>
               <Route exact path="/" >
                   <Presentacion/>
               </Route>
               <Route exact path="/splascreen">
            <Splascreen/>
               </Route>
               <Route exact path="/signIn">
                <SignIn/>
               </Route>
               <Route path="/signUp">
                   <SignUp/>
               </Route>
               <Route exact path="/home">
                 <Home/>
               </Route>
           </Router>
        )
    }
}

export default App;
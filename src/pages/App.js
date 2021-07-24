import React from "react";
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Logo from "../componentes/logo";
import DashBoard from "./dashBoardv3";
import SignUp from "./signUp";
import SignIn from "./signIn";
import SignInV2 from "./signInv2";
import Splascreen from "./splascreen";
import Home from "./home";
class App extends React.Component{
    constructor(props){
        super(props);
    
    }
    render(){
        return(
           <Router>
               <Route exact path="/" >
                   <Home/>
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
               <Route exact path="/Logo" >
                   <Logo/>
               </Route>
               <Route exact path="/dashBoard">
                 <DashBoard/>
               </Route>
           </Router>
        )
    }
}

export default App;
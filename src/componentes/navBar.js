import React from "react";
import Logo from "../componentes/logo";
class NavBar extends React.Component{
    render(){
        return(
            <div className="container-principal">
                <div>
                    <Logo />
                </div>
               <div className="container-nav-bar">
               <ul className="nav-bar">
                    <li><a href="##">Home</a></li>
                    <li><a href="##">Acerca de nosotros</a></li>
                    <li><a href="##">Support</a></li>
                </ul>
               </div>
               <div>
                   <button className="button-sign-in">Sign in</button>
               </div>
            </div>
        )
    }
}

export default NavBar;
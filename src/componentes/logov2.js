import React from 'react';
import Loading from './loading';
import imglogo from "../imgs/paleta.png";

class LogoV2 extends React.Component{
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        let load = document.getElementsByClassName("loading");
        load[0].style.display = "block"
    }
    
    render() {
        return (
             <>
             <div className="logov2">
            <div className="icon">
            <img src={imglogo} alt="icon" width="60px" height="60px"/>
             <h2>TokkioEdit</h2>
            </div>
             <div className="logo-loading"><Loading/></div>
             </div>
             </>
        );
    }
}

export default LogoV2;
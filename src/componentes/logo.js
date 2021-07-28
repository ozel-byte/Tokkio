import React from "react";
import { withRouter } from 'react-router-dom';
import imglogo from "../imgs/paleta.png";
class Logo extends React.Component{
    render(){
        return(
            <div className="logo">
                <img src={imglogo} alt="" width="50px" height="50px" />
                <h2>TokkioEdit</h2>

            </div>
        )
    }
}

export default withRouter(Logo);
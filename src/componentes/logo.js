import React from "react";
import { withRouter } from 'react-router-dom';

class Logo extends React.Component{
    render(){
        return(
            <div className="logo">
                <h2>Tokkio</h2><br/>
                <p>Edita fotos con tus amigos</p>
            </div>
        )
    }
}

export default withRouter(Logo);
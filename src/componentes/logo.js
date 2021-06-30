import React from "react";
import { withRouter } from 'react-router-dom';

class Logo extends React.Component{
    render(){
        return(
            <div className="logo">
                <h2>Tokkio</h2>
                <p>Edicion de fotos en tiempo real, comparte una foto con tus amigos<br/> para editarlo en grupo donde quieran que esten.</p>
            </div>
        )
    }
}

export default withRouter(Logo);
import React from 'react';
import { withRouter } from "react-router-dom";

class Presentacion extends React.Component{

    constructor(props) {
        super(props);
        
    }

    splascreen(){
        this.props.history.push('/splascreen');
    }
    
    render() {
        return (
             <>
             <div className="container-signIn-presentacion">
                <div className="container-signIn-Data-info">
                        <h2 className="animate__animated animate__flip"><img src="src/imgs/paleta.png" alt="icon" width="60px" height="60px"/> TokkioEdit</h2>
                        <p className="animate__animated animate__fadeInUp">edita tus fotos con amigos en tiempo real</p>
                        <button className="signIn-presentacion animate__animated animate__fadeIn" onClick={this.splascreen.bind(this)}>Iniciar</button>
                </div>
             </div>
             </>
        );
    }
}

export default withRouter(Presentacion);
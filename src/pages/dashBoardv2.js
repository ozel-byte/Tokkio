import React from 'react';


class DashBoardv2 extends React.Component{
    constructor() {
        super();
       this.state = {
           aux : false,
           aux2: false
       }
    }

    openModalListUser(){
        console.log("hola 1");
       if (!this.state.aux){
           let modalListUser = document.getElementsByClassName("list-user-conectados");
           modalListUser[0].style.display = 'block';
           let modalNotificacion = document.getElementsByClassName("notificacion");
           modalNotificacion[0].style.display = "none"
           this.setState({
               aux: true
           });
       }else{
           let modalListUser = document.getElementsByClassName("list-user-conectados");
           modalListUser[0].style.display = 'none';
           this.setState({
               aux: false
           });
       }
    }
    openModalNotificacion(){
        console.log("hola 2");
        if (!this.state.aux2){
            let modalListUser = document.getElementsByClassName("list-user-conectados");
            modalListUser[0].style.display = 'none';
            let modalNotificacion = document.getElementsByClassName("notificacion");
            modalNotificacion[0].style.display = "block"
            this.setState({
                aux2: true
            });
        }else{
            let modalNotificacion = document.getElementsByClassName("notificacion");
            modalNotificacion[0].style.display = "none"
            this.setState({
                aux2: false
            });
        }
    }
    render() {
        return(
            <>
            <div className="container-windows-slider">
                <div className="window-slider-list">
                    <div className="space-configure-img">
                        <h5>hey malcom</h5>
                    </div>
                    <div className="list-users">
                       <div onClick={this.openModalListUser.bind(this)}> <img src="src/imgs/notificacion.png" alt="" width="20px" height="20px"/></div>
                        <div onClick={this.openModalNotificacion.bind(this)}> <img src="src/imgs/teamwork.png" alt="" width="20px" height="20px"/></div>
                    </div>
                </div>
                <div className="list-user-conectados" id="lis-user-conectados">

                </div>
                <div className="notificacion" >

                </div>
                <div className="windows-slider-img"></div>
                <div className="windows-slider-configure"></div>
            </div>
            </>
        )
    }
}

export default DashBoardv2;
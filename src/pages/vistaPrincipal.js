import React from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import NavBar from "../componentes/navBar";
import Logo from "../componentes/logo";
import PosicionUserCardInfo from "../componentes/posicionUserCardInfo";


class VistaPrincipal extends React.Component{
    constructor() {
        super();
        this.state = {
            correo: "",
            pass: ""
        }
    }

    componentDidMount() {
        if (window.localStorage.getItem('usertokkio')){
            this.props.history.push('/dashBoard')
        }
    }

    onChange(e){
        let value = e.target.value;
        if (e.target.name === 'correo'){
            this.setState({
                correo: value
            })
        }else{
            this.setState({
                pass: value
            })
        }
    }

    login(){
       axios.get('http://localhost:3001/user/signIn',{
           params: {
               correo: this.state.correo,
               pass:this.state.pass
           }
       }).then((res) => {
           console.log(res.data[0].username + "si llego")
           if (res.data[0].correo.length>0){
              window.localStorage.setItem('usertokkio',res.data[0].username)
              this.props.history.push('/dashBoard');
           }
           alert(res.data)
       }).catch(e => {
           alert(e)
       })
    }

    render() {
        return (
            <div className="container">
                <div className="card-one">
                    <div className="posicioncard">
                        <div><img src="src/imgs/picture.png" alt="" /></div>
                        <div>
                            <h2>TokkioEdit</h2>
                        </div>
                        <div className="information">
                            <h1> Edita tus fotos en tiempo real<br/> con tus amigos</h1>
                            <p>Escoge a tus amigos donde quieran que esten </p>
                        </div>
                    </div>
                </div>
                <div className="card-two">
                    <div className="container-form">
                        <div className="card-form">
                            <div className="text-form">
                                <h2>Hola! <br/> Bienvenido a TokkioEdit</h2>
                                <p>No tienes cuenta? <a href="/signUp">Crear cuenta</a></p>
                            </div>
                            <div className="formulario">
                                <input type="text" name="correo"  placeholder="Ingrese su correo" className="input-class" onChange={this.onChange.bind(this)}/>
                                <input type="text" name="pass"  placeholder="Ingrese su password" onChange={this.onChange.bind(this)}/>
                            </div>
                            <div>
                                <button className="button-iniciar" onClick={this.login.bind(this)}>Iniciar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(VistaPrincipal);
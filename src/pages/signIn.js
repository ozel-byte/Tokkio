import React from 'react';
import Logo from '../componentes/logo';
import MessageError from '../componentes/messageError';
import axios from 'axios';

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            messageError: "",
            status_button: false,
            correo: "",
            pass: ""
        }
    }

    validacionInput(e){
        let name = e.target.name;
        let value = e.target.value;
        if(name === "correo"){
            this.setState({
                correo: value
            });
            if (this.state.password.length>0){
                this.setState({
                    status_button:true
                })
            }
        }else{
            console.log("entra e validacion password")
            this.setState({
                pass:value
            });
            if (this.state.correo.length>0){
                console.log("correo entra")
                this.setState({
                    status_button:true
                })
            }
        }
    }

    messageDisplayButton(e){
        let message = document.getElementsByClassName("message-error-button");
        message[0].style.display = "none"
        this.changeColorBorderInputError(0);
    }
    
    signIn(){
        axios.get('http://localhost:3000/user/signIn',{
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
        }).catch(e => {
            alert(e)
        })
     }

    signIn(){
        console.log("ey")
        if (this.state.status_button && this.state.correo.length>0 && this.state.password.length>0) {
            console.log("ey1")
        }else{
            this.changeColorBorderInputError(1);
            let messageErrorButton = document.getElementsByClassName("message-error-button");
            messageErrorButton[0].style.display = "block"
        }
    }

    changeColorBorderInputError(e){
       if(e === 0){
        let borderInputColorError = document.getElementsByClassName("input-mail");
        borderInputColorError[0].style.border = 'none';
        borderInputColorError[1].style.border = 'none';
        borderInputColorError[0].style.borderBottom = '1px solid #e0e0e0';
        borderInputColorError[1].style.borderBottom = '1px solid #e0e0e0';
       }else{
        let borderInputColorError = document.getElementsByClassName("input-mail");
        borderInputColorError[0].style.border = '1px solid #932939';
        borderInputColorError[1].style.border = '1px solid #932939';
       }
    }
    
    render() {
        return (
             <>
             <div className="container-father">
                 <div className="logo">
                    <Logo/>
                 </div>
                 <div>
                     <div className="card-form">
                       
                        <div className="form">
                            <h2>Welcome Back</h2>
                            <p>sign in with your correo de Tokkio</p>
                            <input type="text" name="correo"  className="input-mail" placeholder="write your mail of Tokkio" onChange={this.validacionInput.bind(this)} onFocus={this.messageDisplayButton.bind(this)}/>
                            <p className="message-error">{this.state.messageError}</p>
                            <br />
                            <input type="password" name="password"  className="input-mail" placeholder="write your password" onChange={this.validacionInput.bind(this)} onFocus={this.messageDisplayButton.bind(this)}/>
                            <p className="message-error">{this.state.messageError}</p>
                            <button type="button" onClick={this.signIn.bind(this)} className="button-sign-in">Sign In</button>
                           <MessageError/>
                            <div className="seccion-Utils">
                                <div><p>Olvidaste tu password?</p></div>
                                <div className="divider"></div>
                                <div><a href="/signUp">Sign Up</a></div>
                            </div>
                        </div>
                     </div>
                 </div>
             </div>
             </>
        );
    }
}

export default SignIn;
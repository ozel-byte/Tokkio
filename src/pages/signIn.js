import React from 'react';
import Logo from '../componentes/logo';
import MessageError from '../componentes/messageError';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Loading from '../componentes/loading';
import swal from 'sweetalert';
class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            messageError: "",
            status_button: false,
            correo: "",
            pass: "",
            textaux: "Sign In"
        }
    }

    

    /*validando input */
    validacionInput(e){
        let name = e.target.name;
        let value = e.target.value;
        if(name === "correo"){
            this.setState({
                correo: value
            });
            if (this.state.pass.length>0){
                this.setState({
                    status_button:true
                })
            }
        }else{
            this.setState({
                pass:value
            });
            if (this.state.correo.length>0){
                this.setState({
                    status_button:true
                })
            }
        }
    }

    /*Metodo para mostrar mensaje de error */
    messageDisplayButton(e){
        let message = document.getElementsByClassName("message-error-button");
        message[0].style.display = "none"
        this.changeColorBorderInputError(0);
    }
   
    /*Metodo la el login */
  async  signIn(){
        this.setState({
            textaux: ""
        })
        let load = document.getElementsByClassName("loading");
        load[0].style.display = "block"
        if (this.state.status_button && this.state.correo.length>0 && this.state.pass.length>0) {
           
           let response = await axios.get('http://167.172.146.90:3000/user/signIn',{
            params: {
                correo: this.state.correo,
                pass:this.state.pass
            },
            });
            if(response.status === 200){
                if(response.data.find === "true"){
                    window.localStorage.setItem('usertokkio',response.data.body[0].username);
                    load[0].style.display = "none"
                    this.props.history.push('/home');
                }else{
                    swal(response.data.message, "Intentelo de nuevo!", "error");
                   load[0].style.display = "none";
                   this.setState({
                    textaux: "Sign in"
                })
                }
            }else{
                swal(response.data.message, "Intentelo de nuevo!", "error");
                load[0].style.display = "none";
                   this.setState({
                    textaux: "Sign in"
                })
            }
            
           
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

    signUp(){
        this.props.history.push('/signUp');
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
                            <button type="button" onClick={this.signIn.bind(this)} className="button-sign-in">{this.state.textaux}<Loading/></button>
                           <MessageError/>
                            <div className="seccion-Utils">
                                <div><p>Olvidaste tu password?</p></div>
                                <div className="divider"></div>
                                <div onClick={this.signUp.bind(this)} className="next-signUp"><a>Sign Up</a></div>
                            </div>
                        </div>
                     </div>
                 </div>
             </div>
             </>
        );
    }
}

export default withRouter(SignIn);
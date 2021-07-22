import React from "react";
import CardSignUp from "../componentes/cardSignUp";
import Logo from "../componentes/logo";
import MessageError from "../componentes/messageError";
import axios from 'axios';
import Loading from "../componentes/loading";
import { withRouter } from "react-router-dom";
class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            imagePerfil: "src/imgs/saliut.jpg",
            imagePerfilSend: null,
            correo: "",
            username: "",
            password: "",
            loading: "Sign Up",
            messageUsername: "",
            messageCorreo: ""
        }
    }
    uploadImage(e) {
        let image = e.target.files[0];
        console.log(e.target.files[0]);
      this.setState({
          imagePerfilSend: e.target.files[0]
      })
        this.setState({
            imagePerfil: URL.createObjectURL(image)
        });
    
    }

    onChangeInput(e){
        
        switch (e.target.name) {
            case "correo":{
                this.setState({
                    correo: e.target.value
                })
            }break;
            case "username": {
                this.setState({
                    username: e.target.value
                })
            }break;
            case "password": {
                this.setState({
                    password: e.target.value
                })
            }break;
        
            default:
                break;
        }
    }

   async changeImageCloudinary(){
        if(this.state.correo.length>0 && this.state.password.length > 0 && this.state.username.length > 0){
            const fData = new FormData();
            fData.append("file", this.state.imagePerfilSend);
            fData.append("upload_preset","rhvqjres");
            this.setState({
                loading: ""
            });
            let load = document.getElementsByClassName("loading");
            load[0].style.display = "block"
          let response = await axios.post('https://api.cloudinary.com/v1_1/dv5fwf13g/image/upload',fData);
           return await response;
        }else{
            let messageError = document.getElementsByClassName("message-error-button");
            messageError[0].style.display = "block"
        }
    }

  async validarCorreo(){
    let load = document.getElementsByClassName("loading");
    load[1].style.display = "block"
        let response = await axios.get("http://localhost:3000/user/validationCorreo",{
            params: {
                correo: this.state.correo
            }
        });
        if(response.status === 200){
            let messageInputStatus = document.getElementsByClassName("message-input-status");
            console.log(response.data.find);
            load[1].style.display = "none"
            switch (response.data.find) {
                case "false":{
                    messageInputStatus[1].style.display = "block";
                    messageInputStatus[1].style.color = "#932939"   
                    this.setState({
                        messageUsername:response.data.body
                    });
                   
                    
                }  break;
                case "true": {
                    console.log("entro aquiiiiii")
                    messageInputStatus[1].style.display = "block";
                    messageInputStatus[1].style.color = "blue"  
                this.setState({
                    messageUsername:response.data.body
                });
                }break;
            
                default:
                    break;
            }
        }else{
            console.log("error")
        }
    }
   async validarUsername(){
    let load = document.getElementsByClassName("loading");
    load[0].style.display = "block"
        let response = await axios.get("http://localhost:3000/user/validationUsername",{
            params: {
                username: this.state.username
            }
        });
        if(response.status === 200){
            let messageInputStatus = document.getElementsByClassName("message-input-status");
            console.log(response.data.find);
            load[0].style.display = "none"
            switch (response.data.find) {
                case "false":{
                    messageInputStatus[0].style.display = "block";
                    messageInputStatus[0].style.color = "#932939"   
                    this.setState({
                        messageUsername:response.data.body
                    });
                   
                    
                }  break;
                case "true": {
                    console.log("entro aquiiiiii")
                    messageInputStatus[0].style.display = "block";
                    messageInputStatus[0].style.color = "blue"  
                this.setState({
                    messageUsername:response.data.body
                });
                }break;
            
                default:
                    break;
            }
        }else{
            console.log("error")
        }
    }

    signUp(){
      this.changeImageCloudinary().then( res => {
          const dataBody = {
              correo: this.state.correo,
              username: this.state.username,                            
              pass: this.state.password,
              imgPerfil: res.data.url
          }
        axios.post("http://localhost:3000/user/addUser",dataBody)
        .then(data => {
            this.props.history.push('/dashBoard');
        })
        .catch(e => console.log(e))
      })
    }
    
    render() {
        return(
            <>  
               <div className="container-card">
                
                  <div className="card">
                    <h2>Crear Cuenta</h2>
                    <p>ya tienes una cuenta? <a href="/"> Sign In</a></p>
                    <div>
                       <div className="container-img-input">
                           <div className="select-img">
                           <img src={this.state.imagePerfil} alt="" width="60px" height="60px"  />
                           </div>
                       <input type="file" onChange={this.uploadImage.bind(this)}/>
                       </div>
                      <div className="container-input-validation">
                     <div className="container-input-loading">
                     <input type="text" name="username" placeholder="username"  className="input-correo-signUp" onBlur={this.validarUsername.bind(this)} onChange={this.onChangeInput.bind(this)}/>
                       <Loading/>
                     </div>
                       <div className="message-input-status"><p>{this.state.messageUsername}</p></div>
                      </div>
                        <br />  
                        <div className="container-input-validation">
                     <div className="container-input-loading">
                     <input type="text" name="correo" placeholder="correo" className="input-correo-signUp" onBlur={this.validarCorreo.bind(this)} onChange={this.onChangeInput.bind(this)}/>
                       <Loading/>
                     </div>
                       <div className="message-input-status"><p>{this.state.messageUsername}</p></div>
                      </div>
                       
                        <br />
                        <input type="password" name="password" className="input-password-signup" placeholder="password" onChange={this.onChangeInput.bind(this)} />
                    </div>
                    <div className="container-button-signUp">
                        <button className="button-signUp" onClick={this.signUp.bind(this)}>{this.state.loading} <Loading/></button>
                    </div>
                   <MessageError/>
                  </div>
               </div>
            </>
        )
    }
}
export default withRouter(SignUp);
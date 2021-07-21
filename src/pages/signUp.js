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
            loading: "Sign Up"
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

    validarCorreo(){

    }
    validarUsername(){
        
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
                    <p>ya tienes una cuenta? <a href="/SignIn"> Sign In</a></p>
                    <div>
                       <div className="container-img-input">
                           <div className="select-img">
                           <img src={this.state.imagePerfil} alt="" width="60px" height="60px"  />
                           </div>
                       <input type="file" onChange={this.uploadImage.bind(this)}/>
                       </div>
                       <input type="text" name="username" placeholder="username"  className="input-correo-signUp" onChange={this.onChangeInput.bind(this)}/>
                        <br />  
                        <input type="text" name="correo" placeholder="correo" className="input-correo-signUp" onChange={this.onChangeInput.bind(this)}/>
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
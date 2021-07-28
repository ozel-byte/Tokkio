import React from "react";
import CardSignUp from "../componentes/cardSignUp";
import Logo from "../componentes/logo";
import MessageError from "../componentes/messageError";
import axios from 'axios';
import Loading from "../componentes/loading";
import { withRouter } from "react-router-dom";
import swal from 'sweetalert';
class SignUp extends React.Component {
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
            messageCorreo: "",
            banderaValidacionCampoUsername: false,
            banderaValidacionCampoCorreo: false
        }
    }
    uploadImage(e) {
        let messageError = document.getElementsByClassName("message-error-button");
        messageError[0].style.display = "none"
        let image = e.target.files[0];
        this.setState({
            imagePerfilSend: e.target.files[0]
        })
        this.setState({
            imagePerfil: URL.createObjectURL(image)
        });

    }

    onChangeInput(e) {
        switch (e.target.name) {
            case "correo": {
                this.setState({
                    correo: e.target.value
                })
            } break;
            case "username": {
                this.setState({
                    username: e.target.value
                })
            } break;
            case "password": {
                this.setState({
                    password: e.target.value
                })
            } break;

            default:
                break;
        }
    }

    async changeImageCloudinary() {
        if (this.state.imagePerfilSend != null && this.state.correo.length > 0 && this.state.password.length > 0 && this.state.username.length > 0) {
            if(this.state.banderaValidacionCampoCorreo && this.state.banderaValidacionCampoUsername){
                const fData = new FormData();
            fData.append("file", this.state.imagePerfilSend);
            fData.append("upload_preset", "rhvqjres");
            this.setState({
                loading: ""
            });
            let load = document.getElementsByClassName("loading");
            load[0].style.display = "block"
            let response = await axios.post('https://api.cloudinary.com/v1_1/dv5fwf13g/image/upload', fData);
            return await response;
            }else{
                swal("credenciales ocupados", "Intentelo de nuevo!", "warning");
            }
        } else {
            let messageError = document.getElementsByClassName("message-error-button");
            messageError[0].style.display = "block"
        }
    }

    async validarCorreo() {
        let load = document.getElementsByClassName("loading-signUp");
        load[1].style.display = "block"
        let response = await axios.get("http://localhost:3000/user/validationCorreo", {
            params: {
                correo: this.state.correo
            }
        });
        if (response.status === 200) {
            let messageInputStatus = document.getElementsByClassName("message-validacion-correo");
            load[1].style.display = "none"
            switch (response.data.find) {
                case "false": {
                    messageInputStatus[0].style.display = "block";
                    messageInputStatus[0].style.color = "#932939"
                    this.setState({
                        messageCorreo: response.data.body,
                        banderaValidacionCampoCorreo: false
                    });


                } break;
                case "true": {
                    messageInputStatus[0].style.display = "block";
                    messageInputStatus[0].style.color = "blue"
                    this.setState({
                        messageCorreo: response.data.body,
                        banderaValidacionCampoCorreo: true
                    });

                } break;

                default:
                    break;
            }
        } else {
        }
    }
    async validarUsername() {
        let load = document.getElementsByClassName("loading-signUp");
        load[0].style.display = "block"
        let response = await axios.get("http://localhost:3000/user/validationUsername", {
            params: {
                username: this.state.username
            }
        });
        if (response.status === 200) {
            load[0].style.display = "none";
            let messageInputStatus = document.getElementsByClassName("message-validacion-username");
            switch (response.data.find) {
                case "false": {
                    messageInputStatus[0].style.display = "block";
                    messageInputStatus[0].style.color = "#932939"
                    this.setState({
                        messageUsername: response.data.body,
                        banderaValidacionCampoUsername: false
                    });
                } break;
                case "true": {
                   
                    messageInputStatus[0].style.display = "block";
                    messageInputStatus[0].style.color = "blue";

                    this.setState({
                        messageUsername: response.data.body,
                        banderaValidacionCampoUsername: true
                    });
                } break;

                default:
                    break;
            }
            load[0].style.display = "none";
        } else {

        }
    }

    signUp() {
        this.changeImageCloudinary().then(res => {
            const dataBody = {
                correo: this.state.correo,
                username: this.state.username,
                pass: this.state.password,
                imgPerfil: res.data.url
            }
            axios.post("http://localhost:3000/user/addUser", dataBody)
                .then(data => {
                    let loa = document.getElementsByClassName("loading");
                    loa[0].style.display = "none";
                    this.setState({
                        loading: "Sign Up"
                    });
                    swal("se creo con exito", "disfrute la edicion de fotos :9", "success");
                    this.props.history.push("/signIn")
                })
                .catch(e => console.log(e))
        })
    }

    render() {
        return (
            <>
                <div className="container-card">
                    <div className="card">
                        <h2>Crear Cuenta</h2>
                        <p>ya tienes una cuenta? <a href="/"> Sign In</a></p>
                        <div className="container-inputs-signUp">
                            <div className="input-file-img-user">
                                <input type="file" id="file" onChange={this.uploadImage.bind(this)} /><label htmlFor="file" ><div className="view-img-user-selected-signUp"><img src={this.state.imagePerfil} alt="" /></div></label>
                                <p>seleciona una imagen</p>
                            </div>
                            <div className="input-username-signUp">
                                <div className="container-input-username-validation-signUp">
                                    <input type="text" placeholder="ingrese un username" name="username" onChange={this.onChangeInput.bind(this)} onBlur={this.validarUsername.bind(this)}/>
                                    <div className="loading-signUp"></div>
                                </div>
                                <div className="message-validacion-username">
                                    <p>{this.state.messageUsername}</p>
                                </div>
                            </div>
                            <div className="input-correo-signUp">
                                <div className="container-input-correo-validation-signUp">
                                    <input type="text" placeholder="ingrese un correo" name="correo" onChange={this.onChangeInput.bind(this)} onBlur={this.validarCorreo.bind(this)}/>
                                    <div className="loading-signUp"></div>
                                </div>
                                <div className="message-validacion-correo">
                                    <p>{this.state.messageCorreo}</p>
                                </div>
                            </div>
                            <div className="input-password-signUp">
                                <input type="password" placeholder="ingrese su password" name="password" onChange={this.onChangeInput.bind(this)} />
                            </div>
                        </div>
                        <div className="container-button-signUp">
                            <button className="button-signUp" onClick={this.signUp.bind(this)}>{this.state.loading} <Loading /></button>
                        </div>
                        <MessageError />
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(SignUp);
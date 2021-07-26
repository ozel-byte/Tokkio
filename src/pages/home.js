import React from 'react'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import BrightnessMediumOutlinedIcon from '@material-ui/icons/BrightnessMediumOutlined';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import ExposureOutlinedIcon from '@material-ui/icons/ExposureOutlined';
import GradientOutlinedIcon from '@material-ui/icons/GradientOutlined';
import ExposurePlus1OutlinedIcon from '@material-ui/icons/ExposurePlus1Outlined';
import ExposureNeg1OutlinedIcon from '@material-ui/icons/ExposureNeg1Outlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import axios from 'axios';
import io from 'socket.io-client';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socketIo: null,
            aux: false,
            aux2: false,
            bandera: false,
            auxNotify: false,
            auxAmigo: false,
            auxAjustesbrillo: false,
            auxAjustesSaturacion: false,
            auxAjustesContraste: false,
            auxAjustesMatiz: false,
            nombreImg: "",
            imgUser: '',
            imgInvitado: '',
            username: '',
            userNameInv: '',
            idUser: '',
            user: [],
            auxInvitar: false,
            invitaciones: [],
            arrayImgFiltros: ["vintage", "lomo", "clarity", "sincity", "crossprocess", "pinhole", "nostalgia", "hermajesty"]
        }

    }

    componentDidMount() {
        this.getUserData();
    }
    getUserData() {
        axios.get("http://localhost:3000/user/getUserUsername", {
            params: {
                username: window.localStorage.getItem('usertokkio')
            }
        }).then(res => {
           
            this.setState({
                username: res.data[0].username,
                imgUser: res.data[0].imgPerfil
            })
            this.initSocket();
        }).catch(e => {
            console.log(e)
        })
    }

    initSocket() {
        let imagenInvitado = document.getElementsByClassName("home-side-bar-user-invited");
        const socket = io('http://localhost:3000');
        this.setState({
            socketIo: socket
        })
        let username = window.localStorage.getItem('usertokkio');
        let objectUser = {
            username: username,
            imgUser: this.state.imgUser
        }
        socket.on("enviar-id", (res) => {
            this.setState({
                idUser: res
            })
        })
        socket.emit('message', objectUser);
        socket.on('emitir', (res) => {
            let auxvariabel = res;
            this.setState({
                user: res
            });

            imagenInvitado[0].style.display = "none";

        });

        socket.on("notificacion", (res) => {
            let auxInvitaciones = this.state.invitaciones
            auxInvitaciones.push(res)
            this.setState({
                invitaciones: auxInvitaciones
            })
            let notifiactive = document.getElementsByClassName("notificacion-activo");
            notifiactive[0].style.display = "block";

        })
        socket.on("invitacion-acpetada", (res) => {
            imagenInvitado[0].style.display = "block";
            this.setState({
                userNameInv: res.username
            })
            alert(res.username + " acepto tu invitacion")
        })
    }

  uploadImage() {
        this.setState({
            bandera: true
        })
        let homeSideBarImagenMessageImagen = document.getElementsByClassName("home-side-bar-imagen-message-imagen");
        homeSideBarImagenMessageImagen[0].style.display = "none";
        let fileimageblob = document.getElementById("file");
        canvas.style.display = "block";
        const selectedImage = fileimageblob.files[0];
        this.setState({
            nombreImg: fileimageblob.files[0].name
        })
        this.changeCloudbinary(selectedImage);


    }

    changeCloudbinary(img){
        const fData = new FormData();
        fData.append("file", img);
        fData.append("upload_preset","rhvqjres");
        axios.post('https://api.cloudinary.com/v1_1/dv5fwf13g/image/upload',fData).then(response => {
           
            let canvas = document.getElementById("canvas");
            let context = canvas.getContext('2d');
            let imageObj = new Image();
            imageObj.onload = () => {
                canvas.width = imageObj.width;
                canvas.height = imageObj.height;
                context.drawImage(imageObj, 0, 0)
            }
            imageObj.src = response.data.url;
        }).catch("error");
    }

    invitarUser(username, index) {
        if (!this.state.auxInvitar) {
            this.asignarImagen(username.imgUser);
            let objetoUser = {
                idReceptor: username.idUser,
                idEmisor: this.state.idUser,
                userName: this.state.username,
                imgUser: this.state.imgUser
            }
            this.state.socketIo.emit("notificacion-user", objetoUser);

            let styleButtonInvitar = document.getElementsByClassName("style-button-invitar");
            styleButtonInvitar[index].style.backgroundColor = "grey";
        } else {

        }
    }

    asignarImagen(imagenUser) {
        this.setState({
            imgInvitado: imagenUser
        })
    }

    aceptarInvitacion(user, index) {
        let objetoAcepto = {
            id: user.idEmisor,
            username: this.state.username,
            imagen: this.state.imgUser
        }
        this.state.socketIo.emit("aceptar-invitacion", objetoAcepto)
        let auxInvitaciones = this.state.invitaciones
        auxInvitaciones.splice(index, 1);
        this.setState({
            invitaciones: auxInvitaciones,
            userNameInv: user.userName
        })
        this.asignarImagen(user.imgUser);
        let imagenInvitado = document.getElementsByClassName("home-side-bar-user-invited");
        imagenInvitado[0].style.display = "block";
    }

    /* filtros */

    filtros(typefilter) {
        console.log("entro");
        let loaderfiltross = document.getElementsByClassName("loader-filtro");
        loaderfiltross[typefilter.index].style.display = "block";
        switch (typefilter.item) {
            case "vintage": {
                Caman("#canvas", function () {
                    this.vintage().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            } break;
            case "lomo": {
                Caman("#canvas", function () {
                    this.lomo().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            } break;
            case "clarity": {
                Caman("#canvas", function () {
                    this.clarity().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            } break;
            case "sincity": {
                Caman("#canvas", function () {
                    this.sinCity().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            } break;
            case "crossprocess": {
                Caman("#canvas", function () {
                    this.crossProcess().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            } break;
            case "pinhole": {
                Caman("#canvas", function () {
                    this.pinhole().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            } break;
            case "nostalgia": {
                Caman("#canvas", function () {
                    this.nostalgia().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            } break;
            case "hermajesty": {
                Caman("#canvas", function () {
                    this.herMajesty().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            } break;
            default:
                break;
        }

    }

    asiganarNombreDescargaImagen() {
        const canvas = document.getElementById('canvas');
        const imagen = this.state.nombreImg;

        const extension = imagen.slice(-4);
        let nuevoNombre = imagen;

        if (extension === ".jpg" || extension === ".png") {
            nuevoNombre = imagen.substring(0, imagen.length - 4) + "-editado.jpg";
        }

        this.descargarImagen(canvas, nuevoNombre);
    }
    descargarImagen(canvas, newFilename) {

        let e;
        const link = document.createElement("a");

        link.download = newFilename;
        link.href = canvas.toDataURL("image/jpeg", 0.8);

        e = new MouseEvent("click");
        link.dispatchEvent(e);
    }
    openwindowAjustes() {
        if (!this.state.aux2) {
            let as = document.getElementsByClassName("side-bar-ajustes-etc");
            let sizehomesidebarimagen = document.getElementsByClassName("home-side-bar-imagen");
            sizehomesidebarimagen[0].style.width = "82%";
            as[0].style.display = "block";
            this.setState({
                aux2: true
            })
        } else {
            let as = document.getElementsByClassName("side-bar-ajustes-etc");
            as[0].style.display = "none";
            let sizehomesidebarimagen = document.getElementsByClassName("home-side-bar-imagen");
            sizehomesidebarimagen[0].style.width = "92%";
            this.setState({
                aux2: false
            })
        }

    }


    viewHomeSideBarImagen() {
        if (this.state.bandera) {

            let classviewHomeSideBarImagen = document.getElementsByClassName("home-side-bar-filtro-view");
            let classhomeSideBarImagen = document.getElementsByClassName("home-side-bar-imagen");
            if (!this.state.aux) {
                classhomeSideBarImagen[0].style.width = "77%";
                classviewHomeSideBarImagen[0].style.transition = "3s ease-out";
                classviewHomeSideBarImagen[0].style.display = "flex";
                this.setState({
                    aux: true
                })
            } else {
                classhomeSideBarImagen[0].style.width = "92%";
                classviewHomeSideBarImagen[0].style.display = "none";
                this.setState({
                    aux: false
                })
            }
        }
    }

    openWindowNotify() {
        let notify = document.getElementsByClassName("home-windows-view-notificaciones");
        let notifiactive = document.getElementsByClassName("notificacion-activo");
        if (!this.state.auxNotify) {
            notifiactive[0].style.display = "none";
            notify[0].style.display = "flex";
            this.setState({
                auxNotify: true
            })
        } else {
            notify[0].style.display = "none";
            this.setState({
                auxNotify: false
            })
        }
    }

    openWindowAmigo() {
        let amigos = document.getElementsByClassName("home-window-view-amigos");
        if (!this.state.auxAmigo) {
            amigos[0].style.display = "flex";
            this.setState({
                auxAmigo: true
            })
        } else {
            amigos[0].style.display = "none";
            this.setState({
                auxAmigo: false
            })
        }
    }

    opensideBarItemButtos(typeItem, clastype) {
        let d = document.getElementsByClassName(clastype);
        switch (typeItem) {
            case "brillo": {
                if (!this.state.auxAjustesbrillo) {
                    d[0].style.display = "block";
                    this.setState({
                        auxAjustesbrillo: true
                    })
                } else {
                    d[0].style.display = "none";
                    this.setState({
                        auxAjustesbrillo: false
                    });
                }
            } break;
            case "saturacion": {
                if (!this.state.auxAjustesSaturacion) {
                    d[0].style.display = "block";
                    this.setState({
                        auxAjustesSaturacion: true
                    })
                } else {
                    d[0].style.display = "none";
                    this.setState({
                        auxAjustesSaturacion: false
                    })
                }
            } break;
            case "contraste": {
                if (!this.state.auxAjustesContraste) {
                    d[0].style.display = "block";
                    this.setState({
                        auxAjustesContraste: true
                    })
                } else {
                    d[0].style.display = "none";
                    this.setState({
                        auxAjustesContraste: false
                    })
                }
            } break;
            case "matiz": {
                if (!this.state.auxAjustesMatiz) {
                    d[0].style.display = "block";
                    this.setState({
                        auxAjustesMatiz: true
                    })
                } else {
                    d[0].style.display = "none";
                    this.setState({
                        auxAjustesMatiz: false
                    })
                }
            } break;

            default:
                break;
        }



    }

    downBrillo() {
        Caman("#canvas", function () {
            this.brightness(-2).render();
        });
    }
    downSaturacion() {
        Caman("#canvas", function () {
            this.saturation(-2).render();
        });
    }
    downContraste() {
        Caman("#canvas", function () {
            this.contrast(-2).render();
        });
    }
    downMatiz() {
        Caman("#canvas", function () {
            this.hue(-2).render();
        });
    }

    downButton(typeButton) {
        switch (typeButton) {
            case "brillo": this.downBrillo(); break;
            case "saturacion": this.downSaturacion(); break;
            case "contraste": this.downContraste(); break;
            case "matiz": this.downMatiz(); break;
            default:
                break;
        }
    }

    upBrillo() {
        Caman("#canvas", function () {
            this.brightness(2).render();
        });
    }
    upSaturacion() {
        Caman("#canvas", function () {
            this.saturation(2).render();
        });
    }
    upContraste() {
        Caman("#canvas", function () {
            this.contrast(2).render();
        });
    }
    upMatiz() {
        Caman("#canvas", function () {
            this.hue(2).render();
        });
    }
    upButton(typeButton) {
        switch (typeButton) {
            case "brillo": this.upBrillo(); break;
            case "saturacion": this.upSaturacion(); break;
            case "contraste": this.upContraste(); break;
            case "matiz": this.upMatiz(); break;
            default:
                break;
        }
    }
    render() {
        return (
            <>
                <div className="container-home">
                    <div className="home-side-bar-filtro">
                        <div className="home-image-user">
                            <div className="container-list-user-conected">
                                <div className="home-side-bar-filtro-circle-image-avatar"> <img src={this.state.imgUser} alt="avtar" /></div>
                                <div className="home-side-bar-user-invited"><img src={this.state.imgInvitado} alt="" /></div>
                            </div>
                            <div className="home-side-bar-filtro-icon-users" onClick={this.openWindowAmigo.bind(this)} >
                                <GroupAddIcon style={{ fontSize: 25 }} />
                            </div>
                            <div className="home-side-bar-filtro-icon-notification" onClick={this.openWindowNotify.bind(this)}>
                                <NotificationsIcon style={{ fontSize: 25 }} />
                                <div className="notificacion-activo"></div>
                            </div>
                        </div>
                        <div className="home-side-bar-filtro-icons">
                            <ul className="list-home-side-bar-filtro-icons">
                                <li onClick={this.viewHomeSideBarImagen.bind(this)}> <PhotoFilterIcon style={{ fontSize: 25 }} /></li>
                                <li onClick={this.viewHomeSideBarImagen.bind(this)}> <TextFormatIcon style={{ fontSize: 25 }} /></li>
                                <li onClick={this.viewHomeSideBarImagen.bind(this)}><ArrowDownwardIcon style={{ fontSize: 25 }} /></li>
                            </ul>
                        </div>
                        <div className="home-side-bar-filtro-ajustes">
                            <input type="file" id="file" onChange={this.uploadImage.bind(this)} /><label htmlFor="file" ><PhotoLibraryIcon /></label>
                            <MoreVertIcon />
                        </div>
                    </div>
                    <div className="home-side-bar-filtro-view animate__animated animate__backInLeft">
                        <ul className="home-list-image-filtros">
                            {
                                this.state.arrayImgFiltros.map((item, index) => {
                                    return (
                                        <li onClick={() => this.filtros({ index, item })} >{item}<div className="loader-filtro"></div></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="home-windows-view-notificaciones">
                        <div className="window-notificaciones">
                            <div className="head-notificaciones">
                                <h2>NOTIFICACIONES</h2>
                                <div onClick={this.openWindowNotify.bind(this)}>
                                    <CloseOutlinedIcon style={{ fontSize: 30 }} />
                                </div>
                            </div>
                            <ul>
                                {
                                    this.state.invitaciones.map((item, index) => {
                                        return (
                                            <li>
                                                <div className="container-item-user">
                                                    <div className="container-img-username">
                                                        <div>
                                                            <img src={item.imgUser} alt="" width="40px" height="40px" />
                                                        </div>
                                                        <div className="container-username-activo">
                                                            <p>{item.userName}</p>
                                                            <div><p>Te ha invitado</p></div>
                                                        </div>
                                                    </div>
                                                    <div className="container-button-invitar">
                                                        <button onClick={() => this.aceptarInvitacion(item, index)}>Aceptar</button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="home-window-view-amigos">
                        <div className="window-notificaciones">
                            <div className="head-notificaciones">
                                <h2>Amigos</h2>
                                <div onClick={this.openWindowAmigo.bind(this)}>
                                    <CloseOutlinedIcon style={{ fontSize: 20 }} />
                                </div>
                            </div>

                            <div className="div-buscador">
                                <input className="buscar-amigo" placeholder="Busca a un amigo" />
                                <ul>
                                    {
                                        this.state.user.map((item, index) => {
                                            return (
                                                <If condition={item.user != this.state.username && item.user != this.state.userNameInv}>
                                                    <li>
                                                        <div className="container-item-user">
                                                            <div className="container-img-username">
                                                                <div>
                                                                    <img src={item.imgUser} alt="" width="40px" height="40px" />
                                                                </div>
                                                                <div className="container-username-activo">
                                                                    <p>{item.user}</p>
                                                                    <div> <p>Activo</p></div>
                                                                </div>
                                                            </div>
                                                            <div className="container-button-invitar">
                                                                <button onClick={() => this.invitarUser(item, index)} className="style-button-invitar">Invitar</button>
                                                            </div>
                                                        </div>
                                                    </li>

                                                </If>

                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="home-side-bar-imagen">
                        <div className="home-side-bar-imagen-message-imagen"><h3>seleciona una imagen</h3></div>
                        <canvas id="canvas" width="100%" height="100vh"></canvas>
                    </div>
                    <div className="side-bar-ajustes-etc">
                        <h2>Ajustes</h2>
                        <ul className="home-list-icons-ajustes">
                            <li onClick={() => this.opensideBarItemButtos("brillo", "item-container-buttons-brillo")}><BrightnessMediumOutlinedIcon /><p>Brillo</p></li>
                            <li className="item-container-buttons-brillo">
                                <div className="buttons-brillo">
                                    <button className="button-remove-brillo" onClick={() => this.upButton("brillo")}><ExposurePlus1OutlinedIcon /></button>
                                    <button><ExposureNeg1OutlinedIcon onClick={() => this.downButton("brillo")} /></button>
                                </div>
                            </li>
                            <li onClick={() => this.opensideBarItemButtos("saturacion", "item-container-buttons-saturacion")}><BarChartOutlinedIcon /><p>Saturacion</p></li>
                            <li className="item-container-buttons-saturacion">
                                <div className="buttons-saturacion">
                                    <button className="button-remove-saturacion" onClick={() => this.upButton("saturacion")}><ExposurePlus1OutlinedIcon /></button>
                                    <button><ExposureNeg1OutlinedIcon onClick={() => this.downButton("saturacion")} /></button>
                                </div>
                            </li>
                            <li onClick={() => this.opensideBarItemButtos("contraste", "item-container-buttons-contraste")}><ExposureOutlinedIcon /><p>contraste</p></li>
                            <li className="item-container-buttons-contraste">
                                <div className="buttons-contraste">
                                    <button className="button-remove-contraste" onClick={() => this.upButton("contraste")}><ExposurePlus1OutlinedIcon /></button>
                                    <button><ExposureNeg1OutlinedIcon onClick={() => this.downButton("contraste")} /></button>
                                </div>
                            </li>
                            <li onClick={() => this.opensideBarItemButtos("matiz", "item-container-buttons-matiz")}><GradientOutlinedIcon /><p>Matiz</p></li>
                            <li className="item-container-buttons-matiz">
                                <div className="buttons-matiz">
                                    <button className="button-remove-matiz" onClick={() => this.upButton("matiz")}><ExposurePlus1OutlinedIcon /></button>
                                    <button><ExposureNeg1OutlinedIcon onClick={() => this.downButton("matiz")} /></button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="home-side-bar-settings">
                        <div className="descargar-image" onClick={this.asiganarNombreDescargaImagen.bind(this)}><PlayForWorkIcon /></div>
                        <div className="ajustes-image" onClick={this.openwindowAjustes.bind(this)}>
                            <div><Brightness5Icon /></div>
                        </div>
                        <div className="espacio"></div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
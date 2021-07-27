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
import ReplayOutlinedIcon from '@material-ui/icons/ReplayOutlined';
import axios from 'axios';
import io from 'socket.io-client';
import swal from 'sweetalert';
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
            auxInvitado: false,
            nombreImg: "",
            imgUser: '',
            imgInvitado: '',
            username: '',
            userNameInv: '',
            idUser: '',
            idInvitado: '',
            idEmisor: '',
            user: [],
            imgSendUser: "",
            imgReceivedUser: "",
            auxInvitar: false,
            invitaciones: [],
            tipoUser: "user",
            auxSendImageLoad: false,
            arrayImgFiltros: ["vintage", "lomo", "clarity", "sincity", "crossprocess", "pinhole", "nostalgia", "hermajesty"]
        }

    }

    componentDidMount() {
        this.getUserData();
    }

   
    getUserData() {
        axios.get("http://167.172.146.90:3000/user/getUserUsername", {
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
        const socket = io('http://167.172.146.90:3000');
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
            this.setState({
                user: res,
                auxInvitar: false,
                auxSendImageLoad: false
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
                userNameInv: res.username,
                idInvitado: res.idReceptor
            });
            swal(res.username, "Acepto tu Invitacion");
            if (this.state.auxSendImageLoad) {
                this.sendImageUserConectedRoom(res.idReceptor);
            } else {
                this.setState({
                    auxSendImageLoad: true
                });

            }
        });

        /* recibiendo imagen del otro user*/
        socket.on("send-image-user-conected-room-catch", (res) => {
            swal("kiii", "llegar chang");
            this.changeImageUserReceived(res.imgSend);
        })
        socket.on("recibeParametros", (res) => {
            if (res.tipoP === 1) {
                if (res.upORdown) {
                    this.upButton(res.valorP, 2)
                } else {
                    this.downButton(res.valorP, 2)
                }
            } else if (res.tipoP === 2) {
                this.filtros(res.valorP, 2)
            } else {
                this.revertir(2)
            }
        })
       
    }

    changeImageUserReceived(res) {

        let homeSideBarImagenMessageImagen = document.getElementsByClassName("home-side-bar-imagen-message-imagen");
        homeSideBarImagenMessageImagen[0].style.display = "none";
        let loading = document.getElementsByClassName("divloading");
        loading[0].style.display = "flex";
        let canvas = document.getElementById("canvas");
        canvas.style.display = "block";
        let context = canvas.getContext('2d');
        let imageObj = new Image();

        imageObj.onload = () => {
            canvas.width = imageObj.width;
            canvas.height = imageObj.height;
            context.drawImage(imageObj, 0, 0)
        }

        imageObj.crossOrigin = "Anonymous";
        imageObj.src = res;

        this.setState({
            imgSendUser: res,
            bandera: true
        })

        loading[0].style.display = "none";
    }

    sendImageUserConectedRoom(res) {
        let objectRes = {
            id: res,
            imgSend: this.state.imgSendUser
        }
        this.state.socketIo.emit("send-image-user-conected-room", objectRes);
    }

    uploadImage() {
        this.setState({
            bandera: true
        })
        let homeSideBarImagenMessageImagen = document.getElementsByClassName("home-side-bar-imagen-message-imagen");
        homeSideBarImagenMessageImagen[0].style.display = "none";
        let fileimageblob = document.getElementById("file");

        const selectedImage = fileimageblob.files[0];
        this.setState({
            nombreImg: fileimageblob.files[0].name
        })
        this.changeCloudbinary(selectedImage);
    }

    changeCloudbinary(img) {
        let loading = document.getElementsByClassName("divloading");
        loading[0].style.display = "flex";
        const fData = new FormData();
        fData.append("file", img);
        fData.append("upload_preset", "rhvqjres");
        axios.post('https://api.cloudinary.com/v1_1/dv5fwf13g/image/upload', fData).then(response => {
            let canvas = document.getElementById("canvas");
            canvas.style.display = "block";
            let context = canvas.getContext('2d');
            let imageObj = new Image();
            imageObj.onload = () => {
                canvas.width = imageObj.width;
                canvas.height = imageObj.height;
                context.drawImage(imageObj, 0, 0)
            }

            imageObj.crossOrigin = "Anonymous";
            imageObj.src = response.data.url;

            this.setState({
                imgSendUser: response.data.url
            });

            if (this.state.auxSendImageLoad) {
                let id = this.state.idInvitado;

                this.sendImageUserConectedRoom(id);

            } else {
                this.setState({
                    auxSendImageLoad: true
                })
            }

            loading[0].style.display = "none";
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
            idReceptor: user.idReceptor,
            username: this.state.username,
            imagen: this.state.imgUser
        }
        this.state.socketIo.emit("aceptar-invitacion", objetoAcepto)
        let auxInvitaciones = this.state.invitaciones
        auxInvitaciones.splice(index, 1);
        this.setState({
            invitaciones: auxInvitaciones,
            userNameInv: user.userName,
            idEmisor: user.idEmisor,
            auxInvitado: true,
            tipoUser: "invitado"
        })
        this.asignarImagen(user.imgUser);
        let imagenInvitado = document.getElementsByClassName("home-side-bar-user-invited");
        let notify = document.getElementsByClassName("home-windows-view-notificaciones");
        imagenInvitado[0].style.display = "block";
        notify[0].style.display = "none";
        this.setState({
            auxNotify: false
        })
    }

    /* filtros */

    filtros(typefilter, emitir) {
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
        if (emitir === 1) { this.enviarParametrosFiltro(2, typefilter, false) }

    }
    enviarParametrosFiltro(tipo, valores, upORdown) {
        let id;
        if (!this.state.auxInvitado) {
            id = this.state.idInvitado
        } else {
            id = this.state.idEmisor
        }
        let datos = {
            id: id,
            tipoP: tipo,
            valorP: valores,
            upORdown: upORdown
        }
        this.state.socketIo.emit("enviandoParametros", datos)
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

    downButton(typeButton, emitir) {
        switch (typeButton) {
            case "brillo": this.downBrillo(); if (emitir === 1) { this.enviarParametros(1, typeButton, false) } break;
            case "saturacion": this.downSaturacion(); if (emitir === 1) { this.enviarParametros(1, typeButton, false) } break;
            case "contraste": this.downContraste(); if (emitir === 1) { this.enviarParametros(1, typeButton, false) } break;
            case "matiz": this.downMatiz(); if (emitir === 1) { this.enviarParametros(1, typeButton, false) } break;
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
    upButton(typeButton, emitir) {
        switch (typeButton) {
            case "brillo": this.upBrillo(); if (emitir === 1) { this.enviarParametros(1, typeButton, true) }; break;
            case "saturacion": this.upSaturacion(); if (emitir === 1) { this.enviarParametros(1, typeButton, true) }; break;
            case "contraste": this.upContraste(); if (emitir === 1) { this.enviarParametros(1, typeButton, true) }; break;
            case "matiz": this.upMatiz(); if (emitir === 1) { this.enviarParametros(1, typeButton, true) }; break;
            default:
                break;
        }
    }

    enviarParametros(tipo, valor, upORdown) {
        let id;
        if (!this.state.auxInvitado) {
            id = this.state.idInvitado
        } else {
            id = this.state.idEmisor
        }
        let datos = {
            id: id,
            tipoP: tipo,
            valorP: valor,
            upORdown: upORdown
        }
        this.state.socketIo.emit("enviandoParametros", datos)
    }

    revertir(emitir) {
        Caman("#canvas", function () {
            this.revert();
        });
        if (emitir === 1) { this.enviarParametrosFiltro(3, "revertir", false) }
    }

    render() {
        return (
            <>
                <div className="container-home" onMouseMove={this.mousemoveuser.bind(this)}>
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
                                <li onClick={() => this.revertir(1)}><ReplayOutlinedIcon style={{ fontSize: 25 }} /></li>
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
                                        <li onClick={() => this.filtros({ index, item }, 1)} >{item}<div className="loader-filtro"></div></li>
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
                    <div className="divloading">
                        <div className="loadingImg"></div>
                    </div>
                    <div className="side-bar-ajustes-etc">
                        <h2>Ajustes</h2>
                        <ul className="home-list-icons-ajustes">
                            <li onClick={() => this.opensideBarItemButtos("brillo", "item-container-buttons-brillo")}><BrightnessMediumOutlinedIcon /><p>Brillo</p></li>
                            <li className="item-container-buttons-brillo">
                                <div className="buttons-brillo">
                                    <button className="button-remove-brillo" onClick={() => this.upButton("brillo", 1)}><ExposurePlus1OutlinedIcon /></button>
                                    <button><ExposureNeg1OutlinedIcon onClick={() => this.downButton("brillo", 1)} /></button>
                                </div>
                            </li>
                            <li onClick={() => this.opensideBarItemButtos("saturacion", "item-container-buttons-saturacion")}><BarChartOutlinedIcon /><p>Saturacion</p></li>
                            <li className="item-container-buttons-saturacion">
                                <div className="buttons-saturacion">
                                    <button className="button-remove-saturacion" onClick={() => this.upButton("saturacion", 1)}><ExposurePlus1OutlinedIcon /></button>
                                    <button><ExposureNeg1OutlinedIcon onClick={() => this.downButton("saturacion", 1)} /></button>
                                </div>
                            </li>
                            <li onClick={() => this.opensideBarItemButtos("contraste", "item-container-buttons-contraste")}><ExposureOutlinedIcon /><p>contraste</p></li>
                            <li className="item-container-buttons-contraste">
                                <div className="buttons-contraste">
                                    <button className="button-remove-contraste" onClick={() => this.upButton("contraste", 1)}><ExposurePlus1OutlinedIcon /></button>
                                    <button><ExposureNeg1OutlinedIcon onClick={() => this.downButton("contraste", 1)} /></button>
                                </div>
                            </li>
                            <li onClick={() => this.opensideBarItemButtos("matiz", "item-container-buttons-matiz")}><GradientOutlinedIcon /><p>Matiz</p></li>
                            <li className="item-container-buttons-matiz">
                                <div className="buttons-matiz">
                                    <button className="button-remove-matiz" onClick={() => this.upButton("matiz", 1)}><ExposurePlus1OutlinedIcon /></button>
                                    <button><ExposureNeg1OutlinedIcon onClick={() => this.downButton("matiz", 1)} /></button>
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
import React from 'react';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import ReplayIcon from '@material-ui/icons/Replay';
import PeopleIcon from '@material-ui/icons/People';
import ItemAmigo from '../componentes/itemAmigo';
import axios from 'axios';
import io from 'socket.io-client';

class DashBoardv3 extends React.Component {
    constructor() {
        super();
        this.state = {
            aux: false,
            aux2: false,
            aux3: false,
            aux4: false,
            aux5: false,
            auxUser: false,
            auxAmigos: false,
            sinImage: true,
            imgUser: '',
            username: '',
            user: []
        }
        this.fileInput = React.createRef();
    }

    componentDidMount() {
        let tamanoImg = document.getElementsByClassName("canva");
        tamanoImg[0].style.maxHeight = "5%";
        this.getUserData();
        this.setState({imgUser: "https://cdn.dribbble.com/users/215/screenshots/15549385/media/1bc71b42034a8192729903deb2d3c0c0.png"})
        this.cargarImagen("https://image.flaticon.com/icons/png/512/1837/1837526.png")
    }

    initSocket() {
        const socket = io('http://localhost:3000');
        let username = window.localStorage.getItem('usertokkio');
        let objectUser = {
            username: username,
            imgUser: this.state.imgUser
        }
        console.log(this.state.imgUser + " ssssss")
        socket.emit('message', objectUser)
        socket.on('emitir', (res) => {
            let auxvariabel = res;
            this.setState({
                user: res
            })
            console.log(res[0]);
        });
    }

    getUserData() {
        axios.get("http://localhost:3000/user/getUserUsername", {
            params: {
                username: window.localStorage.getItem('usertokkio')
            }
        }).then(res => {
            console.log(res.data)
            this.setState({
                username: res.data[0].username,
                imgUser: res.data[0].imgPerfil
            })
            this.initSocket();
        }).catch(e => {
            console.log(e)
        })
    }

    openModaFiltros(e) {
        let mostrarFiltros = document.getElementsByClassName("contaierVistaFiltros");
        let ispaceImg = document.getElementsByClassName("containerImagen");
        let tamanoImg = document.getElementsByClassName("canva");
        let texto = document.getElementsByClassName("texto");
        let containerBtnFil = document.getElementsByClassName("containerBtnFil");
        let prueba = document.getElementsByClassName("prueba");
        if (!this.state.aux) {
            this.cerrarVentanas()
            mostrarFiltros[0].style.width = "20%";
            mostrarFiltros[0].style.display = "flex";
            if (!this.state.sinImage) {
                ispaceImg[0].style.width = "76%";
                tamanoImg[0].style.maxHeight = "75%";
            }
            texto[0].style.fontSize = "20px";
            containerBtnFil[0].style.width = "95%";
            containerBtnFil[0].style.height = "98vh";
            prueba[0].style.display = "block";
            console.log("verdadero");
            this.setState({aux: true});
        } else {
            console.log("falso");
            mostrarFiltros[0].style.width = "0%";
            mostrarFiltros[0].style.display = "initial";
            if (!this.state.sinImage) {
                ispaceImg[0].style.width = "96%";
                tamanoImg[0].style.maxHeight = "99.8%"
            }
            texto[0].style.fontSize = "0px";
            containerBtnFil[0].style.width = "0%";
            prueba[0].style.display = "none";
            this.setState({aux: false});
        }
    }

    openModaUser(e) {
        let detallesUser = document.getElementsByClassName("detallesUser");
        if (!this.state.auxUser) {
            this.cerrarVentanas();
            detallesUser[0].style.display = "block";
            this.setState({auxUser: true});
        } else {
            detallesUser[0].style.display = "none";
            this.setState({auxUser: false});
        }
    }

    openModaAmigos(e) {
        let listaAmigos = document.getElementsByClassName("listaAmigos");
        if (!this.state.auxAmigos) {
            this.cerrarVentanas();
            listaAmigos[0].style.display = "block";
            this.setState({auxAmigos: true});
        } else {
            listaAmigos[0].style.display = "none";
            this.setState({auxAmigos: false});
        }
    }

    openModaBotones(e) {
        let botonesBrillo = document.getElementsByClassName("botonesBillo");
        if (!this.state.aux2) {
            this.cerrarVentanas();
            botonesBrillo[0].style.display = "block";
            this.setState({aux2: true});
        } else {
            botonesBrillo[0].style.display = "none";
            this.setState({aux2: false});
        }
    }

    openModaContraste(e) {
        let botonesContr = document.getElementsByClassName("botonesContr");
        if (!this.state.aux3) {
            this.cerrarVentanas();
            botonesContr[0].style.display = "block";
            this.setState({aux3: true});
        } else {
            botonesContr[0].style.display = "none";
            this.setState({aux3: false});
        }
    }

    openModaSaturacion(e) {
        let botonesSatu = document.getElementsByClassName("botonesSatu");
        if (!this.state.aux4) {
            this.cerrarVentanas();
            botonesSatu[0].style.display = "block";
            this.setState({aux4: true});
        } else {
            botonesSatu[0].style.display = "none";
            this.setState({aux4: false});
        }
    }

    openModaBIlumna(e) {
        let botonesIlumina = document.getElementsByClassName("botonesIlumina");
        if (!this.state.aux5) {
            this.cerrarVentanas();
            botonesIlumina[0].style.display = "flex";
            this.setState({aux5: true});
        } else {
            botonesIlumina[0].style.display = "none";
            this.setState({aux5: false});
        }
    }

    cerrarVentanas() {
        let botonesBrillo = document.getElementsByClassName("botonesBillo");
        let botonesContr = document.getElementsByClassName("botonesContr");
        let botonesSatu = document.getElementsByClassName("botonesSatu");
        let botonesIlumina = document.getElementsByClassName("botonesIlumina");
        let detallesUser = document.getElementsByClassName("detallesUser");
        let listaAmigos = document.getElementsByClassName("listaAmigos");
        if (this.state.aux) {
            this.setState({aux: true})
            this.openModaFiltros();
        }
        if (this.state.aux2 || this.state.aux3 || this.state.aux4 || this.state.aux5 || this.state.auxUser || this.state.auxAmigos) {
            botonesContr[0].style.display = "none";
            botonesSatu[0].style.display = "none";
            botonesIlumina[0].style.display = "none";
            botonesBrillo[0].style.display = "none";
            detallesUser[0].style.display = "none";
            listaAmigos[0].style.display = "none";
            this.setState({aux2: false, aux3: false, aux4: false, aux5: false, auxUser: false, auxAmigos: false});
        }
    }

    obtenerImagen() {
        let tamanoImg = document.getElementsByClassName("canva");
        if (this.fileInput.current.files[0]) {
            this.setState((state, props) => ({
                nombreImg: this.fileInput.current.files[0].name
            }));

            const context = this.canvasA.getContext("2d");
            const reader = new FileReader();
            const file2 = this.fileInput.current.files[0];
            if (file2) {
                // Leer la imagen como URL
                reader.readAsDataURL(file2);
            }

            reader.addEventListener("load", () => {
                this.cargarImagen(reader.result)
            })
            this.setState({sinImage: false});
            if (!this.state.aux) {
                tamanoImg[0].style.maxHeight = "99.8%"
            } else {
                tamanoImg[0].style.maxHeight = "75%";
            }
        }
    }

    cargarImagen(e) {
        const context = this.canvasA.getContext("2d");
        const image = new Image();
        image.src = e;
        image.onload = () => {
            this.canvasA.width = image.width;
            this.canvasA.height = image.height;
            context.drawImage(image, 0, 0);
            this.canvasA.removeAttribute("data-caman-id");
        };
    }

    filtros() {
        document.addEventListener("click", e => {
            if (e.target.classList.contains("filter-btn")) {
                if (e.target.classList.contains("vintage")) {
                    Caman("#canvaP", function () {
                        this.vintage().render();
                    });
                } else if (e.target.classList.contains("lomo")) {
                    Caman("#canvaP", function () {
                        this.lomo().render();
                    });
                } else if (e.target.classList.contains("clarity")) {
                    Caman("#canvaP", function () {
                        this.clarity().render();
                    });
                } else if (e.target.classList.contains("sincity")) {
                    Caman("#canvaP", function () {
                        this.sinCity().render();
                    });
                } else if (e.target.classList.contains("crossprocess")) {
                    Caman("#canvaP", function () {
                        this.crossProcess().render();
                    });
                } else if (e.target.classList.contains("pinhole")) {
                    Caman("#canvaP", function () {
                        this.pinhole().render();
                    });
                } else if (e.target.classList.contains("nostalgia")) {
                    Caman("#canvaP", function () {
                        this.nostalgia().render();
                    });
                } else if (e.target.classList.contains("hermajesty")) {
                    Caman("#canvaP", function () {
                        this.herMajesty().render();
                    });
                }
            }
        })
    }

    brillo() {
        document.addEventListener("click", e => {
            if (e.target.classList.contains("filter-btn")) {
                if (e.target.classList.contains("addBrillo")) {
                    Caman("#canvaP", function () {
                        this.brightness(2).render();
                    });
                } else if (e.target.classList.contains("removeBrillo")) {
                    Caman("#canvaP", function () {
                        this.brightness(-2).render();
                    });
                }
            }
        })
    }

    contraste() {
        document.addEventListener("click", e => {
            if (e.target.classList.contains("filter-btn")) {
                if (e.target.classList.contains("addContraste")) {
                    Caman("#canvaP", function () {
                        this.contrast(2).render();
                    });
                } else if (e.target.classList.contains("removeContraste")) {
                    Caman("#canvaP", function () {
                        this.contrast(-2).render();
                    });
                }
            }
        })
    }

    saturacion() {
        document.addEventListener("click", e => {
            if (e.target.classList.contains("filter-btn")) {
                if (e.target.classList.contains("addSaturacion")) {
                    Caman("#canvaP", function () {
                        this.saturation(2).render();
                    });
                } else if (e.target.classList.contains("removeSaturacion")) {
                    Caman("#canvaP", function () {
                        this.saturation(-2).render();
                    });
                }
            }
        })
    }

    matiz() {
        document.addEventListener("click", e => {
            if (e.target.classList.contains("filter-btn")) {
                if (e.target.classList.contains("addMatiz")) {
                    Caman("#canvaP", function () {
                        this.hue(2).render();
                    });
                } else if (e.target.classList.contains("removeMatiz")) {
                    Caman("#canvaP", function () {
                        this.hue(-2).render();
                    });
                }
            }
        })
    }

    revertir() {
        Caman("#canvaP", function () {
            this.revert();
        });
    }

    descargarImagenBtn(e) {
        const canvas = document.getElementById('canvaP');
        const imagen = this.state.nombreImg;

        const extension = imagen.slice(-4);
        let nuevoNombre = imagen;

        if (extension === ".jpg" || extension === ".png") {
            nuevoNombre = imagen.substring(0, imagen.length - 4) + "-editado.jpg";
        }

        this.descargarImagen(canvas, nuevoNombre)
    }

    descargarImagen(canvas, newFilename) {

        let e;
        const link = document.createElement("a");

        link.download = newFilename;
        link.href = canvas.toDataURL("image/jpeg", 0.8);

        e = new MouseEvent("click");
        link.dispatchEvent(e);
    }

    render() {
        return (
            <>
                <div className="containerPrincipal">
                    <div className="perfilUsuario" onClick={this.openModaUser.bind(this)}>
                        <img src={this.state.imgUser}/>
                    </div>
                    <div className="detallesUser">
                        <h2>{this.state.username}</h2>
                    </div>
                    <div className="mostraAmigos" onClick={this.openModaAmigos.bind(this)}>
                        <PeopleIcon style={{fontSize: 35}}/>
                    </div>
                    <div className="listaAmigos">
                        <ul>
                            {
                                this.state.user.map(item => {
                                    return (
                                        <li><ItemAmigo user={item}/></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="containerFiltros">
                        <div id="divBtnsFiltro">
                            <div onClick={this.descargarImagenBtn.bind(this)}>
                                <GetAppIcon/>
                            </div>
                            <br/>
                            <div onClick={this.openModaFiltros.bind(this)}>
                                <PhotoFilterIcon/>
                            </div>
                            <br/>
                            <div>
                                <label className="custom-file-upload">
                                    <input type="file" onChange={this.obtenerImagen.bind(this)} ref={this.fileInput}/>
                                    <PublishIcon/>
                                </label>
                            </div>
                            <br/>
                            <div onClick={this.revertir.bind(this)}>
                                <ReplayIcon/>
                            </div>
                        </div>
                    </div>
                    <div id="filtros" className="contaierVistaFiltros">
                        <div className="containerBtnFil">
                            <br/>
                            <br/>
                            <div className="textoDiv">
                                <h1 className="texto">FILTROS</h1>
                            </div>
                            <br/>
                            <div className="prueba">
                                <div className="centrarBotones2">
                                    <button type="button" className="botonesFiltro filter-btn vintage btnFiltro2"
                                            onClick={this.filtros.bind(this)}>Vintage
                                    </button>
                                    <button type="button" className="botonesFiltro filter-btn lomo btnFiltro2"
                                            onClick={this.filtros.bind(this)}>Lomo
                                    </button>
                                </div>
                                <br/>
                                <div className="centrarBotones2">
                                    <button type="button" className="botonesFiltro filter-btn clarity btnFiltro2"
                                            onClick={this.filtros}>Clarity
                                    </button>
                                    <button type="button" className="botonesFiltro filter-btn sincity btnFiltro2"
                                            onClick={this.filtros}>Sin City
                                    </button>
                                </div>
                                <br/>
                                <div className="centrarBotones2">
                                    <button type="button" className="botonesFiltro filter-btn crossprocess btnFiltro2"
                                            onClick={this.filtros}>Cross Process
                                    </button>
                                    <button type="button" className="botonesFiltro filter-btn pinhole btnFiltro2"
                                            onClick={this.filtros}>Pinhole
                                    </button>
                                </div>
                                <br/>
                                <div className="centrarBotones2">
                                    <button type="button" className="botonesFiltro filter-btn nostalgia btnFiltro2"
                                            onClick={this.filtros}>Nostalgia
                                    </button>
                                    <button type="button" className="botonesFiltro filter-btn hermajesty btnFiltro2"
                                            onClick={this.filtros}>Her Majesty
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="espacioImagen" className="containerImagen">
                        <div className="divCanva">
                            <canvas id="canvaP" ref={canvasA => this.canvasA = canvasA} className="canva"/>
                        </div>
                    </div>
                    <div className="containerHerramientas">
                        <div id="herraminetas">
                            <div onClick={this.openModaBotones.bind(this)}>
                                <Brightness6Icon/>
                            </div>
                            <br/>
                            <div onClick={this.openModaContraste.bind(this)}>
                                <img src="https://image.flaticon.com/icons/png/512/570/570960.png" height="22px"
                                     width="22px"/>
                            </div>
                            <br/>
                            <div onClick={this.openModaSaturacion.bind(this)}>
                                <img src="https://image.flaticon.com/icons/png/512/587/587347.png" height="22.5px"
                                     width="22.5px"/>
                            </div>
                            <br/>
                            <div onClick={this.openModaBIlumna.bind(this)}>
                                <img src="https://image.flaticon.com/icons/png/512/73/73570.png" height="23px"
                                     width="23px"/>
                            </div>
                        </div>
                    </div>
                    <div className="botonesBillo">
                        <div className="divMayor">
                            <div>
                                <div className="textoParametro">
                                    <h1>Brillo</h1>
                                </div>
                                <div className="btnMasYmenos">
                                    <button type="button" className="filter-btn removeBrillo btnParametro"
                                            onClick={this.brillo}>-
                                    </button>
                                </div>
                                <div className="btnMasYmenos">
                                    <button type="button" className="filter-btn addBrillo btnParametro"
                                            onClick={this.brillo}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="botonesContr">
                        <div className="divMayor">
                            <div>
                                <div className="textoParametro">
                                    <h1 id="ache">Contraste</h1>
                                </div>
                                <div className="btnMasYmenos">
                                    <button type="button" className="filter-btn removeContraste btnParametro"
                                            onClick={this.contraste}>-
                                    </button>
                                </div>
                                <div className="btnMasYmenos">
                                    <button type="button" className="filter-btn addContraste btnParametro"
                                            onClick={this.contraste}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="botonesSatu">
                        <div className="divMayor">
                            <div>
                                <div className="textoParametro">
                                    <h1 id="ache">Saturacion</h1>
                                </div>
                                <div className="btnMasYmenos">
                                    <button type="button" className="filter-btn removeSaturacion btnParametro"
                                            onClick={this.saturacion}>-
                                    </button>
                                </div>
                                <div className="btnMasYmenos">
                                    <button type="button" className="filter-btn addSaturacion btnParametro"
                                            onClick={this.saturacion}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="botonesIlumina">
                        <div className="divMayor">
                            <div>
                                <div className="textoParametro">
                                    <h1 id="ache">Matiz</h1>
                                </div>
                                <div className="btnMasYmenos">
                                    <button type="button" className="filter-btn removeMatiz btnParametro"
                                            onClick={this.matiz}>-
                                    </button>
                                </div>
                                <div className="btnMasYmenos">
                                    <button type="button" className="filter-btn addMatiz btnParametro"
                                            onClick={this.matiz}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DashBoardv3;
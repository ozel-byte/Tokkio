import React from 'react';
import io from 'socket.io-client';

class DashBoardv2 extends React.Component {
    constructor() {
        super();
        this.state = {
            aux: false,
            aux2: false,
            socket: null,
            user: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();

    }

    componentDidMount() {
        const socket = io('ws://localhost:3001');
        let objectUser = window.localStorage.getItem('usertokkio');
        console.log(objectUser);
        console.log(objectUser)

        socket.on("connection", () => {

        });
        socket.emit('message', objectUser)

        socket.on('emitir', (res) => {
            console.log(res + "llego la respuesta");
            this.setState({
                user: res
            })
        })


        this.cargarImagen("src/imgs/carga-masiva.png")
    }

    handleSubmit(event) {
        event.preventDefault();
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

    vibracion() {
        document.addEventListener("click", e => {
            if (e.target.classList.contains("filter-btn")) {
                if (e.target.classList.contains("addVibracion")) {
                    Caman("#canvaP", function () {
                        this.vibrance(2).render();
                    });
                } else if (e.target.classList.contains("removeVibracion")) {
                    Caman("#canvaP", function () {
                        this.vibrance(-2).render();
                    });
                }
            }
        })
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

    openModalListUser() {
        console.log("hola 1");
        if (!this.state.aux) {
            let modalListUser = document.getElementsByClassName("list-user-conectados");
            modalListUser[0].style.display = 'block';
            let modalNotificacion = document.getElementsByClassName("notificacion");
            modalNotificacion[0].style.display = "none"
            this.setState({
                aux: true
            });

        } else {
            let modalListUser = document.getElementsByClassName("list-user-conectados");
            modalListUser[0].style.display = 'none';
            this.setState({
                aux: false
            });
        }
    }
    openModalNotificacion() {
        window.localStorage.removeItem('usertokkio')
        console.log("hola 2");
        if (!this.state.aux2) {
            let modalListUser = document.getElementsByClassName("list-user-conectados");
            modalListUser[0].style.display = 'none';
            let modalNotificacion = document.getElementsByClassName("notificacion");
            modalNotificacion[0].style.display = "block"
            this.setState({
                aux2: true
            });
        } else {
            let modalNotificacion = document.getElementsByClassName("notificacion");
            modalNotificacion[0].style.display = "none"
            this.setState({
                aux2: false
            });
        }
    }
    render() {
        return (
            <>
                <div className="container-windows-slider">
                    <div className="window-slider-list">
                        <div className="space-configure-img">
                            <div className="space-textos">
                                <div>
                                    <label>HERRAMIMETAS</label>
                                    <br />
                                    <label>IMAGEN</label>
                                </div>
                            </div>
                            <div className="space-botones">
                                <div className="contenerBotones">
                                    <div className="nombreParametro">
                                        <h3>BRILLO</h3>
                                    </div>
                                    <br />
                                    <div className="centrarBotones">
                                        <button type="button" className="filter-btn removeBrillo" onClick={this.brillo}>-</button>
                                        <button type="button" className="filter-btn addBrillo" onClick={this.brillo}>+</button>
                                    </div>
                                </div>
                                <div className="contenerBotones">
                                    <div className="nombreParametro">
                                        <h3>CONTRASTE</h3>
                                    </div>
                                    <br />
                                    <div className="centrarBotones">
                                        <button type="button" className="filter-btn removeContraste" onClick={this.contraste}>-</button>
                                        <button type="button" className="filter-btn addContraste" onClick={this.contraste}>+</button>
                                    </div>
                                </div>
                                <div className="contenerBotones">
                                    <div className="nombreParametro">
                                        <h3>SATURACION</h3>
                                    </div>
                                    <br />
                                    <div className="centrarBotones">
                                        <button type="button" className="filter-btn removeSaturacion" onClick={this.saturacion}>-</button>
                                        <button type="button" className="filter-btn addSaturacion" onClick={this.saturacion}>+</button>
                                    </div>
                                </div>
                                <div className="contenerBotones">
                                    <div className="nombreParametro">
                                        <h3>VIBRACION</h3>
                                    </div>
                                    <br />
                                    <div className="centrarBotones">
                                        <button type="button" className="filter-btn removeVibracion" onClick={this.vibracion}>-</button>
                                        <button type="button" className="filter-btn addVibracion" onClick={this.vibracion}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list-users">
                            <div onClick={this.openModalListUser.bind(this)}> <img src="src/imgs/notificacion.png" alt="" width="20px" height="20px" /></div>
                            <div onClick={this.openModalNotificacion.bind(this)}> <img src="src/imgs/teamwork.png" alt="" width="20px" height="20px" /></div>
                        </div>
                    </div>
                    <div className="list-user-conectados" id="lis-user-conectados">
                        {
                            this.state.user.map(item => {
                                return <ul className="nav">
                                    <li>{item.user}</li>
                                </ul>
                            })
                        }
                    </div>
                    <div className="notificacion" >

                    </div>
                    <div className="windows-slider-img">
                        <canvas id="canvaP" ref={canvasA => this.canvasA = canvasA} className="canva" />
                    </div>
                    <div className="windows-slider-configure">
                        <div className="filtros">
                            <div className="divBotonesFiltro">
                                <div className="nombreParametro">
                                    <h1>FILTROS</h1>
                                </div>
                                <br />
                                <div className="centrarBotones">
                                    <button type="button" className="botonesFiltro filter-btn vintage btnFiltro" onClick={this.filtros}>Vintage</button>
                                    <button type="button" className="botonesFiltro filter-btn lomo btnFiltro" onClick={this.filtros}>Lomo</button>
                                    <button type="button" className="botonesFiltro filter-btn clarity btnFiltro" onClick={this.filtros}>Clarity</button>
                                    <button type="button" className="botonesFiltro filter-btn sincity btnFiltro" onClick={this.filtros}>Sin City</button>
                                </div>
                                <br />
                                <div className="centrarBotones">
                                    <button type="button" className="botonesFiltro filter-btn crossprocess btnFiltro" onClick={this.filtros}>Cross Process</button>
                                    <button type="button" className="botonesFiltro filter-btn pinhole btnFiltro" onClick={this.filtros}>Pinhole</button>
                                    <button type="button" className="botonesFiltro filter-btn nostalgia btnFiltro" onClick={this.filtros}>Nostalgia</button>
                                    <button type="button" className="botonesFiltro filter-btn hermajesty btnFiltro" onClick={this.filtros}>Her Majesty</button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="SubirImg">
                            <form onSubmit={this.handleSubmit}>
                                <input type="file" id="btnImg" className="btnElegirImg" ref={this.fileInput} />
                                <br />
                                <button type="submit" className="btnCargarImg">Cargar Imagen</button>
                            </form>
                        </div>
                        <hr />
                        <div className="filtros">
                            <div className="divBotonesExtra">
                                <div className="nombreParametro">
                                    <h1>MAS OPCIONES</h1>
                                </div>
                                <br />
                                <div className="centrarBotones">
                                    <button id="btnRevertir" className="btnOpciones" onClick={this.revertir}>Revertir Edicion</button>
                                    <button id="btnDescargar" className="btnOpciones" onClick={this.descargarImagenBtn.bind(this)}>Descargar Imagen</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DashBoardv2;
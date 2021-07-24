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

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aux: false,
            aux2: false,
            bandera: false,
            nombreImg: "",
            arrayImgFiltros: ["vintage","lomo","clarity","sincity","crossprocess","pinhole","nostalgia","hermajesty"]
        }

    }

    uploadImage() {
        this.setState({
            bandera: true
        })
        let homeSideBarImagenMessageImagen = document.getElementsByClassName("home-side-bar-imagen-message-imagen");
        homeSideBarImagenMessageImagen[0].style.display = "none";
        let fileimageblob = document.getElementById("file");
        let canvas = document.getElementById("canvas");
        canvas.style.display = "block";
        let context = canvas.getContext('2d');
        const selectedImage = fileimageblob.files[0];
        this.setState({
            nombreImg:fileimageblob.files[0].name
        })
        const img = URL.createObjectURL(selectedImage);

        let imageObj = new Image();
        imageObj.onload = () => {
            canvas.width = imageObj.width;
            canvas.height = imageObj.height;
            context.drawImage(imageObj, 0, 0)
        }
        imageObj.src = img
    }

    /* filtros */

    filtros(typefilter){
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
            }break;
            case "clarity": {
                Caman("#canvas", function () {
                    this.clarity().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            }break;
            case "sincity": {
                Caman("#canvas", function () {
                    this.sinCity().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            }break;
            case "crossprocess": {
                Caman("#canvas", function () {
                    this.crossProcess().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            }break;
            case "pinhole": {
                Caman("#canvas", function () {
                    this.pinhole().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            }break;
            case "nostalgia": {
                Caman("#canvas", function () {
                    this.nostalgia().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            }break;
            case "hermajesty" : {
                Caman("#canvas", function () {
                    this.herMajesty().render();
                    loaderfiltross[typefilter.index].style.display = "none";
                });
            }break;
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
    openwindowAjustes(){
        if(!this.state.aux2){
            let as = document.getElementsByClassName("side-bar-ajustes-etc");
            let sizehomesidebarimagen = document.getElementsByClassName("home-side-bar-imagen");
            sizehomesidebarimagen[0].style.width = "82%";
            as[0].style.display = "block";
            this.setState({
                aux2: true
            })
        }else{
            let as = document.getElementsByClassName("side-bar-ajustes-etc");
            as[0].style.display = "none";
            let sizehomesidebarimagen = document.getElementsByClassName("home-side-bar-imagen");
            sizehomesidebarimagen[0].style.width = "92%";
            this.setState({
                aux2:false
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

    opensideBarButtonsBrillo(){
        let d = document.getElementsByClassName("item-container-buttons-brillo");
        d[0].style.display = "block";
    }

    render() {
        return (
            <>
                <div className="container-home">
                    <div className="home-side-bar-filtro">
                        <div className="home-image-user">
                            <div className="home-side-bar-filtro-circle-image-avatar"></div>
                            <div className="home-side-bar-filtro-icon-users">
                                <GroupAddIcon style={{ fontSize: 25 }} />
                            </div>
                            <div className="home-side-bar-filtro-icon-notification">
                                <NotificationsIcon style={{ fontSize: 25 }} />
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
                              this.state.arrayImgFiltros.map((item,index) => {
                                  return (
                                      <li onClick={() => this.filtros({index,item})} >{item}<div className="loader-filtro"></div></li>
                                  )
                              })
                          }
                        </ul>
                    </div>
                    <div className="home-side-bar-imagen">
                        <div className="home-side-bar-imagen-message-imagen"><h3>seleciona una imagen</h3></div>
                        <canvas id="canvas" width="100%" height="100vh"></canvas>
                    </div>
                    <div className="side-bar-ajustes-etc">
                            <h2>Ajustes</h2>
                               <ul className="home-list-icons-ajustes">
                                <li onClick={this.opensideBarButtonsBrillo.bind(this)}><BrightnessMediumOutlinedIcon/><p>Brillo</p></li>
                                <li className="item-container-buttons-brillo"><div className="buttons-brillo"></div></li>
                                <li><BarChartOutlinedIcon/><p>Saturacion</p></li>
                                <li><ExposureOutlinedIcon/><p>contraste</p></li>
                                <li><GradientOutlinedIcon/><p>Matiz</p></li>
                            </ul>
                    </div>
                    <div className="home-side-bar-settings">
                        <div className="descargar-image" onClick={this.asiganarNombreDescargaImagen.bind(this)}><PlayForWorkIcon/></div>
                        <div className="ajustes-image" onClick={this.openwindowAjustes.bind(this)}>
                            <div><Brightness5Icon/></div>
                        </div>
                        <div className="espacio"></div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
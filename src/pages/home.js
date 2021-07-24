import React from 'react';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import Brightness5Icon from '@material-ui/icons/Brightness5';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aux: false,
            aux2: false,
            bandera: false,
            arrayImgFiltros: ["BW","Sepia","vintaje"]
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

    filtrobw() {
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext('2d');
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height),
            pixels = imageData.data,
            numPixels = imageData.width * imageData.height;

        for (var i = 0; i < numPixels; i++) {
            var r = pixels[i * 4];
            var g = pixels[i * 4 + 1];
            var b = pixels[i * 4 + 2];

            var grey = (r + g + b) / 3;

            pixels[i * 4] = grey;
            pixels[i * 4 + 1] = grey;
            pixels[i * 4 + 2] = grey;
        }

        context.putImageData(imageData, 0, 0);
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
    selectfiltro(value){
        switch (value) {
            case "BW": {
                this.filtrobw();
            }   break;
            case "Sepia": {

            }break;
            case "vintaje": {

            }break;
        
            default:
                break;
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
                              this.state.arrayImgFiltros.map(item => {
                                  return (
                                      <li onClick={() => this.selectfiltro(item)} >{item}</li>
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
                            <ul>
                                <li></li>
                            </ul>
                    </div>
                    <div className="home-side-bar-settings">
                        <div className="descargar-image"><PlayForWorkIcon/></div>
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
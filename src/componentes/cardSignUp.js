import React from "react";
import EditIcon from '@material-ui/icons/Edit';
class CardSignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imagePerfil: "src/imgs/saliut.jpg",
            arrayImages: [
                "https://images.unsplash.com/photo-1625526439553-08baa1794618?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1625510215743-213945a17d15?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1512895691935-ddd98c716644?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI1fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1625242444361-38420b11f107?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1625205387297-afee4892596d?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1621189378573-fead8ffee049?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUxfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            ]
        }
    }

    uploadImage(e) {
        let image = e.target.files[0];
        console.log(e.target.files[0]);
      
        this.setState({
            imagePerfil: URL.createObjectURL(image)
        })
       
        
    }

    positionImageEnter(){
        let ert = document.getElementById("list-images-perfil");
        ert.style.display = 'flex';
        ert.style.flexDirection = 'column'
       
        ert.style.alignItems= 'center'
        ert.style.transition = '2s ease-out'
        console.log("enter")
    }    
    positionImageleave(){
        let ert = document.getElementById("list-images-perfil");
        ert.classList.add('animation-list-images-perfil')
     

        console.log("leave")
    }    

    render() {
        return (
            <>
                <div className="card-signup">
                    <div className="text-singup">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="content-item-signup">
                        <div className="container-img-user">
                            <div className="img-background">
                                <img src={this.state.imagePerfil} alt="" width="80px" height="80px" onMouseEnter={this.positionImageEnter} onMouseLeave={this.positionImageleave} />
                                
                                <div className="button-upload-image">
                                    <div>
                                        <EditIcon style={{ fontSize: 20 }} />
                                    </div>
                                </div>
                                <div className="file-con">
                                     <input type="file" id="filechooser" className="file" onChange={this.uploadImage.bind(this)} />
                                     </div>
                                     <div className="list-images-perfil" id="list-images-perfil" >
                                            {
                                                this.state.arrayImages.map(item => {
                                                    return <ul className="nav-images">
                                                        <li><img src={item} width="100px" height="100px"></img></li>
                                                    </ul>
                                                })
                                            }
                                     </div>
                            </div>
                            <input type="text" placeholder="ingrese un nombre de usurario" />
                        </div>
                        <div className="form-singup">
                            <input type="text" placeholder="ingrese un correo" />
                            <input type="text" placeholder="ingrese un password" />
                        </div>
                        <div className="container-signup-button">
                            <button className='signup-button'>Crear</button>


                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default CardSignUp;
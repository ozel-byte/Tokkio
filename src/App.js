import React from "react";


class App extends React.Component{
    constructor(props){
        super(props);
        this.state =  {
            streamImg: MediaStream
        }
    }
    componentDidMount(){
        this.camara()
    }

  camara() {
    navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(stream => {
        console.log(stream);
        let camera = document.getElementById("camera");
        let texto = document.getElementById("texto");
        texto.style.color = "blue"; 
        camera.srcObject = stream;
        this.setState({
            streamImg: stream
        })
    })    
 }
    render(){
       
        return(
            <div>
                <h1>hel world</h1>
                <h2 id="texto">funciono</h2>
                <video id="camera" autoPlay={true}></video>
                <canvas id="select_canvas" className="select_canvas" width="300px" height="300px"></canvas>
                <button>Poner en gris</button>
            </div>
        )
    }
}

export default App;
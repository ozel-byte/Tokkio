import React from 'react';
import LogoV2 from '../componentes/logov2';
import { withRouter } from "react-router-dom";

class Splascreen extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }
        
    }

    componentDidMount(){
       this.timeSplascreen()
    }

    timeSplascreen(){

       const intervalSplascreen = setInterval(() => {
            this.setState({
                count: this.state.count+1
            })
            console.log(this.state.count)
            console.log("aqui")
            if(this.state.count === 2){
                clearInterval(intervalSplascreen);
                console.log("entro aqui")
                this.props.history.push('/signIn');
            }
        }, 3000);
        
    }
    
    render() {
        return (
             <>
               <div className="container-splas">
               <div className="animate__animated animate__jackInTheBox">
               <LogoV2/>
               </div>
               </div>
             </>
        );
    }
}

export default withRouter(Splascreen);
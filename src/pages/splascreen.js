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
            if(this.state.count === 2){
                clearInterval(intervalSplascreen);
                this.props.history.push('/signIn');
            }
        }, 2000);
        
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
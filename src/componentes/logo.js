import React from "react";
import { withRouter } from 'react-router-dom';

class Logo extends React.Component{
    render(){
        return(
            <div className="logo">
                <img src="src/imgs/picture.png" alt="" width="50px" height="50px" />
                <h2>TokkioEdit</h2>

            </div>
        )
    }
}

export default withRouter(Logo);
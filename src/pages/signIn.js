import React from 'react';
import Logo from '../componentes/logo';


class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            messageError: ""
        }
    }
    
    render() {
        return (
             <>
             <div className="container-father">
                 <div className="logo">
                    <Logo/>
                 </div>
                 <div>
                     <div className="card-form">
                        <div><img src="src/imgs/capas.png" alt="img" width="100px" height="100px" /></div>
                        <div className="form">
                            <h2>Welcome Back</h2>
                            <p>sign in with your correo de Tokkio</p>
                            <input type="text" name="" id="" className="input-mail" placeholder="write your mail of Tokkio"/>
                            <p className="message-error">{this.state.messageError}</p>
                            <br />
                            <input type="password" name="" id="" className="input-mail" placeholder="write your password"/>
                            <p className="message-error">{this.state.messageError}</p>
                            <button className="button-sign-in">Sign In</button>

                        </div>
                     </div>
                 </div>
             </div>
             </>
        );
    }
}

export default SignIn;
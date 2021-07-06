import React from "react";

class CardSignUp extends React.Component{
    render() {
        return(
            <>
                <div className="card-signup">
                   <div className="text-singup">
                       <h1>Crear Cuenta</h1>
                       <p>Crea una cuenta para empezar con la edicion ;)</p>
                   </div>
                   <div className="content-item-signup">
                       <div className="container-img-user">
                           <img src="https://images.unsplash.com/photo-1558620366-bb049bcf9a75?ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXxpZHpKQUpyeDVfd3x8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" width="80px" height="80px"/>
                           <p>selecione una foto</p>
                       </div>
                        <div className="form-singup">
                            <input type="text" placeholder="ingrese un username"/>
                            <input type="text" placeholder="ingrese un correo"/>
                            <input type="text" placeholder="ingrese un password"/>
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
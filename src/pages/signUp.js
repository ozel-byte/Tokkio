import React from "react";
import CardSignUp from "../componentes/cardSignUp";


class SignUp extends React.Component{
    render() {
        return(
            <>
               <div className="container-signup">
                   <CardSignUp/>
               </div>
            </>
        )
    }
}
export default SignUp;
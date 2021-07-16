import React from "react";
import ItemSlider from "../componentes/itemSlider"

class HerramientasEdicion extends React.Component {
     render() {
         return(
             <div>
                 <div className="tituloHerramineta">
                     <h2 className="textoHerr"> HERRAMIENTAS DE EDICION </h2>
                 </div>
                 <hr/>
                 <div className="tituloHerramineta">
                     <h3 className="textoHerr"> EFECTOS </h3>
                 </div>

                 <div className="sliders">
                     <div className="sliderBarra">
                         <ItemSlider/>
                         <ItemSlider/>
                         <ItemSlider/>
                         <ItemSlider/>
                     </div>
                     <div>
                         <h4 className="textoSlider">Brillo</h4>
                         <h4 className="textoSlider">Contraste</h4>
                         <h4 className="textoSlider">Saturacion</h4>
                         <h4 className="textoSlider">Vibracion</h4>
                     </div>
                 </div>

                 <div className="tituloHerramineta">
                     <h3 className="textoHerr"> FILTROS </h3>
                 </div>

                 <div className="filtros">

                 </div>
             </div>
         )
     }
}
export default HerramientasEdicion;
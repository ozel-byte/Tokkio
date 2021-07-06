import React from "react";
import update from 'immutability-helper'

class ItemSlider extends React.Component{

    constructor() {
        super()
        this.state  = {
            idSlider: 0
        }

    }

    changeField(e) {
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state,{
            [field] : {$set : value}
        }))
       // this.idSlider.innerHTML = this.state.idSlider

    }

    render() {
        return (
            <div>

                <div>
                    <input type="range" id="idSlider" name="idSlider" min='-100' max='100' value={this.state.idSlider} onChange={this.changeField.bind(this)} className="slider"/>
                    <label ref={self=> this.idSlider = self}>{this.state.idSlider}</label>
                </div>
            </div>
        )
    }
}

export default ItemSlider;
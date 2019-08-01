import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class AddCart extends Component {
    render() {
        return (
            <div>
                <h1>Your product is Successfully Added into Cart</h1>
            </div>
        )
    }
}
export default withRouter(AddCart)
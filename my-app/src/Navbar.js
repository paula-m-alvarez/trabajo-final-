import React, { Component } from 'react'
import Icono_Search from "./Icono_Search.png"
import Ada from "./Screenshot+2018-12-04+12.17.24.png"
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div className="navbar">
                <img className = "ada" src={Ada} />
                <input type="text" className = "input" placeholder="Nunca dejes de buscar" value={this.state.value} onChange={this.handleChange} />
               
                <Link to={"/items?search=" + this.state.value}> <button> <img className = "icono" src={Icono_Search} /> </button>  </Link>
            </div>
        )
    }
}

export default Navbar;


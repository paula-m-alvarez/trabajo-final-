import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cosa: [],
            categories: [],
            loading: true

        }
    }

    componentDidMount() {

        const id = this.props.match.params.id;

        fetch('http://localhost:3001/api/items/' + id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data.item);
                this.setState({
                    cosa: data.item,
                    categories: data.categories,
                    loading: false
                })
            })
    }

    render() {
        const categories = this.state.categories.map((c, i) =>
            <li>{c}{i < this.state.categories.length - 1 ? " > " : ""}</li>
        )

        if (this.state.loading == true) {
            return <p>Cargando</p>
        }
        return (
            <div className="todo">
                <div className="detalleCategorias">
                    <ul>{categories}</ul>
                </div>

                <div className="detalle">
                    <div className="costado">
                        <div className="imagenDelProducto">
                            <img src={this.state.cosa.picture} />
                        </div>

                        <div className = "datazo">
                            <p>{this.state.cosa.title}</p>
                            <p> Vendidos - {this.state.cosa.sold_quantity}</p>
                            <p> {this.state.cosa.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {this.state.cosa.price.decimal.padEnd(2, 0)} </p>
                            <p>{this.state.cosa.condition}</p>
                            <button> Comprar </button>
                        </div>
                    </div>

                    <div className="descripcion">
                        <p>{this.state.cosa.description}</p>
                    </div>
                    
                    <Link to="/items"><button> Volver </button> </Link>
                </div>
            </div>
        )
    }
}

export default ProductDetail;


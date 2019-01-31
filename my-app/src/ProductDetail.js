import React, { Component } from 'react';

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cosa: [],
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
                    loading: false
                })
            })
    }

    render() {
        if (this.state.loading == true) {
            return <p>Cargando</p>
        }
        return (
            <div>
                <p>{this.state.cosa.title}</p>
                <p> {this.state.cosa.price.amount} {this.state.cosa.price.decimal} </p>
                <img src={this.state.cosa.picture} />
                <p>{this.state.cosa.condition}</p>
                <p>{this.state.cosa.free_shipping}</p>
                <p>{this.state.cosa.sold_quiantity}</p>
                <p>{this.state.cosa.description}</p>
            </div>
        )
    }
}

export default ProductDetail;


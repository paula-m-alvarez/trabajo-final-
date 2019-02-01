import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Camion from "./icono_camion.png"

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: [],
      categories: [],
      palabraClave: ""
    }

  }

  traerCosas() {
    const urlParams = new URLSearchParams(window.location.search);
    const s = urlParams.get("search");

    // console.log(s);

    fetch('http://localhost:3001/api/items?search=' + s)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState({
          productos: data.item,
          categories: data.categories,
          loading: false,
          palabraClave: s
        })
      })

  }

  componentDidMount() {
    this.traerCosas()
  }

  componentDidUpdate() {
    const urlParams = new URLSearchParams(window.location.search);
    const s = urlParams.get("search");

    if (this.state.palabraClave !== s) {
      this.traerCosas()
    }
  }

  render() {

    const categories = this.state.categories.map((c, i) =>
        <li key = {i}>{c}{i < this.state.categories.length - 1 ? " > " : ""}</li>
    )


    const productos = this.state.productos.map((p, i) =>
      <Link className="cadaProducto" to={"/items/" + p.id}>
        <div key = {i} className="producto">
          <div className="imagen">
            <img className="tamañoImagen" src={p.picture} />
          </div>

          <div className="info">
            <div className="datos">
              <p> $ {p.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {p.price.decimal.padEnd(2, 0)} </p>
              {p.free_shipping === true && <img className="camion" src={Camion} />}
            </div>
            
            <p key={p.id} id={p.id}> {p.title} </p>

          </div>

          <div className="ubicacion">
            <p> {p.location}</p>
          </div>
        </div>
      </Link>
    )

    return (
      <div>
        <ul>{categories} </ul>
        <div className="madreDeLosProductos"> {productos} </div>
      </div>
    )
  }
}

export default Products;




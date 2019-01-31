import React, { Component } from 'react';
import {Link } from "react-router-dom";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: [],
      categories: [],
      palabraClave: ""
    }

  }

  // VOY A ESCRIBIR ALGO PORQUE REALMENTE QUIERO PUSHEAR ESTO

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

    const categories = this.state.categories.map((c) =>
      <div>
        <p>{c}</p>
      </div>
    )

    const productos = this.state.productos.map((p) =>
      <Link to={"/items/" + p.id}>
        <div>
          <p key={p.id} id={p.id}> {p.title} </p>
          <p> {p.price.amount} {p.price.decimal} </p>
          <img src={p.picture} />
          <p> {p.condition}</p>
          <p>{p.free_shipping}</p>
          <p> {p.location}</p>
        </div>
      </Link>
    )

    return (
      <div>
        <div> {productos} </div>
        <div> {categories} </div>
      </div>
    )
  }
}

export default Products;

// Ver tema de los decimales que se vean 2 / operador ternario  ¿? 
// maquetar

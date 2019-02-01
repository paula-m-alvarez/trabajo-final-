var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/api/items', function (req, res) {
  const palabraDeBusqueda = req.query.search
  let productos = {
    categories: [],
    item: []
  }

  axios
    .get('https://api.mercadolibre.com/sites/MLA/search?q=' + palabraDeBusqueda + "&limit=4")
    .then(function (result) {
      let data = result.data.results
      let y = result.data.filters
      
      for (let i = 0; i < data.length; i++) {
        let x = {
          id: data[i].id,
          title: data[i].title,
          price: {
            currency: data[i].currency_id,
            amount: String(data[i].price).split('.')[0],
            decimal: String(data[i].price).split('.')[1] || '0',
          },
          picture: data[i].thumbnail,
          condition: data[i].condition,
          free_shipping: data[i].shipping.free_shipping,
          location: data[i].address.city_name

        }
        productos.item.push(x)
      }

      for (let j = 0; j < y.length; j++) {
        let h = y[j].values
        for (let a = 0; a < h.length; a++) {
          productos.categories = h[0].path_from_root.map((c) => c.name);
        }
      }

      console.log(productos);
      res.json(productos);
    })
})


router.get('/api/items/:id', function (req, res) {

  const id = req.params.id
  let cosa = []
  axios.get('https://api.mercadolibre.com/items/' + id)
    .then(resultProduct => {

      axios.get('https://api.mercadolibre.com/items/' + id + "/description")
        .then(resultDescription => {
          const category = resultProduct.data.category_id;

          axios.get('https://api.mercadolibre.com/categories/' + category)
            .then(resultCategory => {
              // console.log(resultProduct.data);
              // console.log(resultDescription.data);
              // console.log(resultCategory.data);

              cosa = {

                categories: resultCategory.data.path_from_root.map(c => c.name),
                item: {
                  id: resultProduct.data.id,
                  title: resultProduct.data.title,
                  price: {
                    currency: resultProduct.data.currency,
                    amount: String(resultProduct.data.price).split('.')[0],
                    decimal: String(resultProduct.data.price).split('.')[1] || '0',
                  },
                  picture: resultProduct.data.thumbnail,
                  condition: resultProduct.data.condition,
                  free_shipping: resultProduct.data.free_shipping,
                  sold_quantity: resultProduct.data.sold_quantity,
                  description: resultDescription.data.plain_text

                }
              }
              console.log(cosa);
              res.json(cosa);
            })
            .catch(err => {
              console.log("No hay respuesta", err);
            })
        })


    })
})

module.exports = router;

// categories: result.data.filters[0].values[0].path_from_root.map(c => c.name),
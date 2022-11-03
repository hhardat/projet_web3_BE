var express = require('express');
var router = express.Router();

const CATALOGUE = [
  {
    id: 1,
    brand: 'Lenovo',
    name: 'IdeaPad 3 15ALC6 82KU01P6MB AZERTY',
    stars: 5,
    price:599,
    category:'Ordinateur Portable'
  },
  {
    id: 2,
    brand:'Logitech',
    name: 'EW3908',
    stars: 4,
    price:44.99,
    category:'Alimentations pour ordinateur'
  },
  {
    id: 3,
    brand:'Seasonic',
    name: 'Focus GX-750',
    stars: 4,
    price: 12.99,
    category:'Alimentations pour ordinateur'
    
  },
  {
    id: 4,
    brand:'Jabra',
    name: 'Evolve2 65 Link380a MS Stéréo Noir',
    stars: 3,
    price:232,
    category:'Casques de bureau'
  },
  {
    id: 5,
    brand:'Logitech',
    name: 'H390 Casque Stéréo USB-A',
    stars: 4,
    price:43.99,
    category:'Casques de bureau'
  }, 
];

// Read all the products from the menu
router.get('/', (req, res, next) => {
  console.log('GET /products');
  res.json(CATALOGUE);
});

module.exports = router;

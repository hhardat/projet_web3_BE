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

// Read all the products from the CATALOGUE
router.get('/', (req, res, next) => {
  // verifier si un paramère
  const orderByName =
  // Si un parametre a été donné pour le query paramètre 
  req?.query?.order?.includes('name')
  // et qu'il contient name
  ? req.query.order // on le conserve
  : undefined; // sinon

  let orderedCatalogue;
  
  if(orderByName) 
    // shallow copy ordered by name
    orderedCatalogue = [...CATALOGUE].sort((p1, p2) => p1.name.localeCompare(p2.name));
  if(orderByName === '-name') orderedCatalogue = orderedCatalogue.reverse(); 
  
  console.log('GET /products');
  res.json(orderedCatalogue ?? CATALOGUE);
});

// Read one product by ID from the CATALOGUE 
router.get('/:id', (req, res, next) => {
  console.log(`GET /products/${req.params.id}`);

  const indexOfProductFound = CATALOGUE.findIndex(p => p.id == req.params.id);

  if(indexOfProductFound < 0 ) return res.sendStatus(404)

  res.json(CATALOGUE[indexOfProductFound]);
})

module.exports = router;

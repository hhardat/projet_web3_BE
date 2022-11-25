var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/products.json';


const CATALOGUE = [
  {
    id: 1,
    brand: "Lenovo",
    name: "IdeaPad 3 15ALC6 82KU01P6MB AZERTY",
    stars: "★★★★★",
    price: 599,
    category: "Ordinateur Portable",
    pathImage: "LIP_15ALC6.jpg"
},
{
    id: 2,
    brand: "Logitech",
    name: "EW3908",
    stars: "★★★★☆",
    price: 44.99,
    category: "Alimentations pour ordinateur",
    pathImage: "L_EW3908.jpg"
},
{
    id: 3,
    brand: "Seasonic",
    name: "Focus GX-750",
    stars: "★★★★☆",
    price: 12.99,
    category: "Alimentations pour ordinateur",
    pathImage: "SF_GX750W.jpg"
},
{
    id: 4,
    brand: "Jabra",
    name: "Evolve2 65 Link380a MS Stéréo Noir",
    stars: "★★★☆☆",
    price: 232,
    category: "Casques de bureau",
    pathImage: "E_65L380MS.jpg"
},
{
    id: 5,
    brand: "Logitech",
    name: "H390 Casque Stéréo USB-A",
    stars: "★☆☆☆☆",
    price: 43.99,
    category: "Casques de bureau",
    pathImage: "L_H390.jpg"
},
{
    id: 6,
    brand: "Apple",
    name: "MacBook Pro 14 QWERTY",
     category: "Ordinateur Portable",
    stars: "☆☆☆☆☆",
    price: 1400,
    pathImage: "MBP_14.jpg"
},
{
    id: 7,
    brand: "Logitech",
    name: "M330 Silent Souris Sans Fil Noir",
    category: "Imprimantes & périphériques",
    stars: "★★★★☆",
    price: 41.99,
    pathImage: "L_M330.jpg"
},
{
    id: 8,
    brand: "BlueBuilt",
    name: "Batterie Externe 20 000 mAh Power Delivery et Quick Charge",
    category: "Téléphonie",
    stars: "★★★☆☆",
    price: 59.99,
    pathImage: "BE_20000MAH.jpg"
},
{
    id: 9,
    brand: "Kobo Libra",
    name: "Kobo Libra 2 Noir",
    category: "Tablettes & liseuses",
    stars: "★★★★☆",
    price: 169,
    pathImage: "KL2_N.jpg"
},
{
    id: 10,
    brand: "Samsung",
    name: "Galaxy A53 128 Go Noir 5G",
    category: "Téléphonie",
    stars: "★★★★☆",
    price: 389,
    pathImage: "G_A53.jpg"
},
{
    id: 11,
    brand: "Apple",
    name: "iPhone 14 128 Go Minuit",
    category: "Téléphonie",
    stars: "★★★★☆",
    price: 1019,
    pathImage: "AIP14.jpg"
},
{
    id: 12,
    brand: "Samsung",
    name: "QD OLED 55S95B (2022)",
    category: "Télévision & vidéoprojecteur",
    stars: "★★★☆☆",
    price: 1699,
    pathImage: "QDOLED_55S95B.jpg"
},
{
    id: 13,
    brand: "Toshiba",
    name: "Canvio Basics Exclusive 2 To",
    category: "Mémoire vive & stockage",
    stars: "★★★★☆",
    price: 98.99,
    pathImage: "TCB_E2.jpg"
},
{
    id: 14,
    brand: "HTC",
    name: "Vive Pro 2 sans manettes et stations de base",
    category: "Casques VR",
    stars:"★★★☆☆",
    price: 719,
    pathImage: "VP_2.jpg"
},
{
    id: 15,
    brand: "Nokia",
    name: "8210 4G Bleu",
    category: "Téléphonie",
    stars: "★★★☆☆",
    price: 73,
    pathImage: "N_8210.jpg"
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

  const catalogue = parse(jsonDbPath, CATALOGUE);
  
  if(orderByName) 
    // shallow copy ordered by name
    orderedCatalogue = [...catalogue].sort((p1, p2) => p1.name.localeCompare(p2.name));
  if(orderByName === '-name') orderedCatalogue = orderedCatalogue.reverse(); 
  
  console.log('GET /products');
  res.json(orderedCatalogue ?? catalogue);
});

// Read one product by ID from the CATALOGUE 
router.get('/:id', (req, res, next) => {
  console.log(`GET /products/${req.params.id}`);

  const catalogue = parse(jsonDbPath, CATALOGUE);

  const indexOfProductFound = catalogue.findIndex(p => p.id == req.params.id);

  if(indexOfProductFound < 0 ) return res.sendStatus(404)

  res.json(catalogue[indexOfProductFound]);
})


// Create a new product to be added to the catalogue.
router.post('/', (req, res) => {
  const brand = req?.body?.brand?.length !== 0 ? req.body.brand : 'Unknown';
  const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;
  const category = req?.body?.brand?.length !== 0 ? req.body.category : 'Unknown';
  const price = req?.body?.price != 0 ? req.body.price : undefined;

  console.log('POST /products');

  if (!name || !price) return res.sendStatus(400); // error code '400 Bad request'

  const catalogue = parse(jsonDbPath, CATALOGUE);
  const lastItemIndex = CATALOGUE?.length !== 0 ? CATALOGUE.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? CATALOGUE[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newProduct = {
    id: nextId,
    brand: brand,
    name: name,
    category: category,
    stars: 0,
    price : price
  };

  catalogue.push(newProduct);

  serialize(jsonDbPath,catalogue);

  res.json(newProduct);
});

router.delete('/:id', (req,res) => {
  console.log(`DELETE /products/${req.params.id}`);

  const catalogue = parse(jsonDbPath, CATALOGUE);

  const foundIndex = catalogue.findIndex(p => p.id == req.params.id)

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromCatalogue = catalogue.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromCatalogue[0]

  serialize(jsonDbPath, catalogue);

  res.json(itemRemoved);
})

router.patch('/:id', (req,res) => {
  console.log(`PATCH /products/${req.params.id}`);

  // Si le client envoie un body vide => res.send(404)
  if(Object.keys(req?.body).length === 0) return res.sendStatus(400)
  
  console.log('POST /products');

  const catalogue = parse(jsonDbPath, CATALOGUE);

  const foundIndex = catalogue.findIndex(p => p.id == req.params.id)
  
  if (foundIndex < 0) return res.sendStatus(404);

  const updatedProduct = {...catalogue[foundIndex], ...req.body};
  
  console.log('UPDATED product ', updatedProduct)

  catalogue[foundIndex] = updatedProduct;

  serialize(jsonDbPath,catalogue)
  
  res.json(updatedProduct)
})

/**
 * Export line
 */
module.exports = router;

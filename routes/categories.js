var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/categories.json';

const CATEGORIES = [
    {
        id: 1,
        name: "Ordinateur Portable",
        uriName: "Ordinateur%20Portable",
        slug: "ordinateurportable",
    },{
        id: 2,
        name: "Alimentations pour ordinateur",
        uriName: "Alimentations%20pour%20ordinateur",
        slug: "alimentationspourordinateur",
    },{
        id: 3,
        name: "Casques de bureau",
        uriName: "Casques%20de%20bureau",
        slug: "casquesdebureau",
    },{
        id: 4,
        name: "Imprimantes & périphériques",
        uriName: "Imprimantes%20%26%20périphériques",
        slug: "imprimantesperipheriques"
    },{
        id: 5,
        name: "Téléphonie",
        uriName: "Téléphonie",
        slug: "telephonie"
    },{
        id: 6,
        name: "Tablettes & liseuses",
        uriName: "Tablettes%20%26%20liseuses",
        slug: "tabletteliseuses"
    },{
        id: 7,
        name: "Télévision & vidéoprojecteur",
        uriName: "Télévision%20%26%20vidéoprojecteur",
        slug: "televisionvideoprojecteur"
    },{
        id: 8,
        name: "Mémoire vive & stockage",
        uriName: "Mémoire%20vive%20%26%20stockage",
        slug: "memoirevivestockage"
    },{
        id: 9,
        name: "Casques VR",
        uriName: "Casques%20VR",
        slug: "casquesvr"
    },
]

// Read all the categories
router.get('/', (req, res, next) => {
 
   const category = parse(jsonDbPath, CATEGORIES);
   
   const filterSlug = 
   // Si un parametre a été donné pour le query paramètre 
   req.query.slug
   
   let filteredBySlug ;

   if(filterSlug){
    filteredBySlug = [...category].filter(category => category.slug === filterSlug)
  }
   console.log('GET /categories');
   res.json(filteredBySlug ?? category);
 });

 // Read one product by ID from the CATALOGUE 
router.get('/:id', (req, res, next) => {
    console.log(`GET /category/${req.params.id}`);
  
    const category = parse(jsonDbPath, CATEGORIES);
  
    const indexOfProductFound = category.findIndex(c => c.id == req.params.id);
  
    if(indexOfProductFound < 0 ) return res.sendStatus(404)
  
    res.json(CATEGORIES[indexOfProductFound]);
  })

 /**
 * Export line
 */
module.exports = router;
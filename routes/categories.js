var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/categories.json';

const CATEGORIES = [
    {
        id: 1,
        name: "Ordinateur Portable",
        uriName: "Ordinateur%20Portable",
    },{
        id: 2,
        name: "Alimentations pour ordinateur",
        uriName: "Alimentations%20pour%20ordinateur",
    },{
        id: 3,
        name: "Casques de bureau",
        uriName: "Casques%20de%20bureau",
    },{
        id: 4,
        name: "Imprimantes & périphériques",
        uriName: "Imprimantes%20%26%20périphériques",
    },{
        id: 5,
        name: "Téléphonie",
        uriName: "Téléphonie",
    },{
        id: 6,
        name: "Tablettes & liseuses",
        uriName: "Tablettes%20%26%20liseuses",
    },{
        id: 7,
        name: "Télévision & vidéoprojecteur",
        uriName: "Télévision%20%26%20vidéoprojecteur",
    },{
        id: 8,
        name: "Mémoire vive & stockage",
        uriName: "Mémoire%20vive%20%26%20stockage",
    },{
        id: 9,
        name: "Casques VR",
        uriName: "Casques%20VR",
    },
]

// Read all the categories
router.get('/', (req, res, next) => {
 
   const category = parse(jsonDbPath, CATEGORIES);

   console.log('GET /categories');
   res.json(category);
 });

 /**
 * Export line
 */
module.exports = router;
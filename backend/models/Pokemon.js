const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    pokedexNumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: [String], required: true },
    abilities: { type: [String], required: true },
    sprite: { type: String, required: true },
    stats: {
      hp: { type: Number, required: true },
      attack: { type: Number, required: true },
      defense: { type: Number, required: true },
      specialAttack: { type: Number, required: true },
      specialDefense: { type: Number, required: true },
      speed: { type: Number, required: true },
    }, 
  }, { collection: 'pokemonBase'});
  
  module.exports = mongoose.model('Pokemon', pokemonSchema);
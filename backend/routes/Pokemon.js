const express = require('express');
const Pokemon = require('../models/Pokemon');
const router = express.Router();

// Get all Pokémon
router.get('/', async (req, res) => {
  try {
    const pokemon = await Pokemon.find();
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search Pokémon by name or Pokedex number
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const pokemon = await Pokemon.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { pokedexNumber: query },
      ],
    });
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  console.log('Received Data:', req.body); 

  try {
    const { pokedexNumber, name, type, abilities, sprite, stats } = req.body;

    if (!pokedexNumber || !name || !type || !abilities || !sprite || !stats) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPokemon = new Pokemon({
      pokedexNumber,
      name,
      type,
      abilities,
      sprite,
      stats,
    });

    await newPokemon.save();
    res.status(201).json({ message: 'Pokemon created!', pokemon: newPokemon });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
// backend/routes/bikeRoutes.js
const express = require('express');
const router = express.Router();
const Bike = require('../models/Bikes');

// GET all bikes
router.get('/', async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add a new bike
router.post('/', async (req, res) => {
  const { model, price, imageUrl, isAvailable } = req.body;

  const newBike = new Bike({
    model,
    price,
    imageUrl,
    isAvailable,
  });

  try {
    const savedBike = await newBike.save();
    res.status(201).json(savedBike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a bike
router.put('/:id', async (req, res) => {
  const { model, price, imageUrl, isAvailable } = req.body;

  try {
    // Find the bike by ID and update it
    const updatedBike = await Bike.findByIdAndUpdate(
      req.params.id,
      { model, price, imageUrl, isAvailable },
      { new: true, runValidators: true } // Return the updated bike and validate
    );

    if (!updatedBike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    res.json(updatedBike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

// backend/routes/cheeseRoutes.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cheese = require('../models/cheese'); 
// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/cheesedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * @swagger
 * /api/cheeses:
 *   get:
 *     summary: Returns the list of all the cheeses
 *     responses:
 *       200:
 *         description: The list of the cheeses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cheese'
 */
router.get('/cheeses', async (req, res) => {
  const cheeses = await Cheese.find();
  res.json(cheeses);
});

/**
 * @swagger
 * /api/cheeses/{id}:
 *   get:
 *     summary: Get the cheese by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The cheese id
 *     responses:
 *       200:
 *         description: The cheese description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cheese'
 *       404:
 *         description: The cheese was not found
 */
router.get('/cheeses/:id', async (req, res) => {
  const cheese = await Cheese.findById(req.params.id);
  if (!cheese) {
    return res.status(404).send('The cheese with the given ID was not found.');
  }
  res.json(cheese);
});

/**
 * @swagger
 * /api/cheeses:
 *   post:
 *     summary: Create a new cheese
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cheese'
 *     responses:
 *       201:
 *         description: The cheese was successfully created
 */
router.post('/cheeses', async (req, res) => {
  const { name, pricePerKilo, color, image } = req.body;
  const cheese = new Cheese({
    name,
    pricePerKilo,
    color,
    image,
  });
  await cheese.save();
  res.status(201).send(cheese);
});

/**
 * @swagger
 * /api/cheeses/{id}:
 *   put:
 *     summary: Update the cheese by the id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The cheese id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cheese'
 *     responses:
 *       200:
 *         description: The cheese was updated
 *       404:
 *         description: The cheese was not found
 */
router.put('/cheeses/:id', async (req, res) => {
  const cheese = await Cheese.findById(req.params.id);
  if (!cheese) {
    return res.status(404).send('The cheese with the given ID was not found.');
  }

  const { name, pricePerKilo, color, image } = req.body;
  cheese.name = name;
  cheese.pricePerKilo = pricePerKilo;
  cheese.color = color;
  cheese.image = image;

  await cheese.save();
  res.send(cheese);
});

/**
 * @swagger
 * /api/cheeses/{id}:
 *   delete:
 *     summary: Deletes a cheese
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The cheese id
 *     responses:
 *       204:
 *         description: The cheese was deleted
 *       404:
 *         description: The cheese was not found
 */
router.delete('/cheeses/:id', async (req, res) => {
    try {
      const cheese = await Cheese.findByIdAndDelete(req.params.id);
      if (!cheese) {
        return res.status(404).send('The cheese with the given ID was not found.');
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).send('Server error.');
    }
  });
  
module.exports = router;

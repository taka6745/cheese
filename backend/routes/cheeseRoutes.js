const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/cheeses:
 * components:
 *   schemas:
 *     Cheese:
 *       type: object
 *       required:
 *         - name
 *         - pricePerKilo
 *         - color
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the cheese.
 *         name:
 *           type: string
 *           description: The name of the cheese.
 *         pricePerKilo:
 *           type: number
 *           description: The price per kilo of the cheese.
 *         color:
 *           type: string
 *           description: The color of the cheese.
 *         image:
 *           type: string
 *           description: URL to the image of the cheese.
 *       example:
 *         id: 1
 *         name: "Cheddar"
 *         pricePerKilo: 15
 *         color: "Yellow"
 *         image: "url-to-cheddar-image"
 */

// In-memory array to store cheeses
let cheeses = [
    { id: 1, name: 'Cheddar', pricePerKilo: 15, color: 'Yellow', image: '1.png' },
    { id: 2, name: 'Mozzarella', pricePerKilo: 12, color: 'White', image: '5.png' },
    { id: 3, name: 'Gouda', pricePerKilo: 16, color: 'Light Yellow', image: '2.png' },
    { id: 4, name: 'Blue Cheese', pricePerKilo: 20, color: 'Blue', image: '4.png' },
    { id: 5, name: 'Brie', pricePerKilo: 18, color: 'Cream', image: '3.png' }
];

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
router.get('/cheeses', (req, res) => {
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
router.get('/cheeses/:id', (req, res) => {
    const cheese = cheeses.find(c => c.id === parseInt(req.params.id));
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
router.post('/cheeses', (req, res) => {
    const { name, pricePerKilo, color, image } = req.body;
    const cheese = {
        id: cheeses.length + 1,
        name,
        pricePerKilo,
        color,
        image
    };
    cheeses.push(cheese);
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
router.put('/cheeses/:id', (req, res) => {
    const cheese = cheeses.find(c => c.id === parseInt(req.params.id));
    if (!cheese) {
        return res.status(404).send('The cheese with the given ID was not found.');
    }

    const { name, pricePerKilo, color, image } = req.body;
    cheese.name = name;
    cheese.pricePerKilo = pricePerKilo;
    cheese.color = color;
    cheese.image = image;

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
router.delete('/cheeses/:id', (req, res) => {
    const cheeseIndex = cheeses.findIndex(c => c.id === parseInt(req.params.id));
    if (cheeseIndex === -1) {
        return res.status(404).send('The cheese with the given ID was not found.');
    }

    cheeses.splice(cheeseIndex, 1);
    res.status(204).send();
});

module.exports = router;

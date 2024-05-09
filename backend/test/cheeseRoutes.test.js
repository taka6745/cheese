const request = require('supertest');
const express = require('express');
const router = require('../routes/cheeseRoutes'); // Replace 'your-router-file' with the actual filename

const app = express();
app.use(express.json());
app.use('/api', router);

describe('Cheese API', () => {
    // Test for getting all cheeses
    it('should return all cheeses', async () => {
        const res = await request(app).get('/api/cheeses');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Test for getting a single cheese by ID
    it('should return a single cheese by ID', async () => {
        const res = await request(app).get('/api/cheeses/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Cheddar');
    });

    // Test for getting a non-existing cheese by ID
    it('should return 404 if cheese with ID is not found', async () => {
        const res = await request(app).get('/api/cheeses/999');
        expect(res.statusCode).toEqual(404);
        expect(res.text).toEqual('The cheese with the given ID was not found.');
    });

    // Test for creating a new cheese
    it('should create a new cheese', async () => {
        const newCheese = {
            name: 'Test Cheese',
            pricePerKilo: 10,
            color: 'White',
            image: 'url-to-test-image'
        };
        const res = await request(app)
            .post('/api/cheeses')
            .send(newCheese);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toMatchObject(newCheese);
    });

    // Test for updating an existing cheese
    it('should update an existing cheese', async () => {
        const updatedCheese = {
            name: 'Updated Cheese',
            pricePerKilo: 12,
            color: 'Blue',
            image: 'url-to-updated-image'
        };
        const res = await request(app)
            .put('/api/cheeses/1')
            .send(updatedCheese);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(updatedCheese);
    });

    // Test for updating a non-existing cheese
    it('should return 404 if cheese to update is not found', async () => {
        const res = await request(app)
            .put('/api/cheeses/999')
            .send({
                name: 'Updated Cheese',
                pricePerKilo: 12,
                color: 'Blue',
                image: 'url-to-updated-image'
            });
        expect(res.statusCode).toEqual(404);
        expect(res.text).toEqual('The cheese with the given ID was not found.');
    });

    // Test for deleting an existing cheese
    it('should delete an existing cheese', async () => {
        const res = await request(app).delete('/api/cheeses/1');
        expect(res.statusCode).toEqual(204);
    });

    // Test for deleting a non-existing cheese
    it('should return 404 if cheese to delete is not found', async () => {
        const res = await request(app).delete('/api/cheeses/999');
        expect(res.statusCode).toEqual(404);
        expect(res.text).toEqual('The cheese with the given ID was not found.');
    });
});

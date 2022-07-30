const request = require('supertest');
const app = require("../../../app");


describe('Category endpoints test suit', () => {

    it('GET: /categories endpoint', async() => {
        const response = await request(app).get("/categories");
        expect(response.statusCode).toBe(200);

    });

    it('POST: /categories endpoint', async() => {
        const response = await request(app)
            .post("/categories")
            .send({name: 'test category'});

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');

    });

    it('GET: /categories/{id} endpoint with not found category', async() => {
        const response = await request(app).get("/categories/100023");
        
        expect(response.statusCode).toBe(404);

    });
});
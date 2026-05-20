const request = require('supertest');

const app = require('../app');

describe('Task API Testing', () => {

    test('GET /api/tasks should return all tasks', async () => {

        const response = await request(app)
            .get('/api/tasks');

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/tasks should create a task', async () => {

        const response = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Test Task',
                description: 'Testing API',
                status: 'pending',
                priority: 'high',
                dueDate: '2026-06-01'
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.title).toBe('Test Task');
    });

});
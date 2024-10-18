const request = require('supertest');
const app = require('../index'); 
let chai;
let expect;

before(async () => {
    chai = await import('chai'); // Import chai dynamically
    expect = chai.expect; // Set expect from chai
});

describe('API Tests for Books', () => {
    it('should respond with 200 for GET /books', async () => {
        const response = await request(app).get('/books');
        expect(response.status).to.equal(200); 
        expect(response.body).to.be.an('array'); 
    });

    it('should create a new book with POST /book', async () => {
        const newBook = { title: 'Test Book', ISBN: '1234567890', category: 'Test Category' };
        const response = await request(app)
            .post('/book')
            .send(newBook);
        expect(response.status).to.equal(201); 
        expect(response.body).to.have.property('_id'); 
        expect(response.body.title).to.equal(newBook.title);  
    });

    it('should update a book with PUT /book/:isbn', async () => {
        const updatedBook = { title: 'Updated Book Title' };
        const response = await request(app)
            .put('/book/1234567890') 
            .send(updatedBook);
        expect(response.status).to.equal(200); 
        expect(response.body.title).to.equal(updatedBook.title); 
    });

    it('should delete a book with DELETE /book/:isbn', async () => {
        const response = await request(app).delete('/book/1234567890'); 
        expect(response.status).to.equal(204); 
    });
});

describe('API Tests for Authors', () => {
    it('should respond with 200 for GET /authors', async () => {
        const response = await request(app).get('/authors');
        expect(response.status).to.equal(200); 
        expect(response.body).to.be.an('array'); 
    });

});

describe('API Tests for Publications', () => {
    it('should respond with 200 for GET /publications', async () => {
        const response = await request(app).get('/publications');
        expect(response.status).to.equal(200); // Chai syntax
        expect(response.body).to.be.an('array'); // Chai syntax
    });

});

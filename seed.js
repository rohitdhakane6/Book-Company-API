const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Books = require('./model/book.js')

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        seedDatabase();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

async function seedDatabase() {
    try {
        await Books.deleteMany({}); // Clear existing data

        const books = [];
        for (let i = 0; i < 50; i++) { // Generate 50 fake books
            books.push({
                title: faker.lorem.words(3),
                ISBN: faker.string.uuid(),
                category: faker.lorem.word(),
                author: faker.person.fullName(),
                publishedDate: faker.date.past()
            });
        }

        await Books.insertMany(books);
        console.log('Database seeded with fake data');
    } catch (err) {
        console.error('Error seeding database', err);
    } finally {
        mongoose.connection.close();
    }
}

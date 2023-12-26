const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
const data = require('./database/index');
const Books = require('./model/book.js')
const Authors = require('./model/author.js')
const Publication=require('./model/publication.js')



const app = express();
app.use(express.json())
//book 

app.get("/books", async (req, res) => {
    return res.json(await Books.find())
})

app.get('/book/:isbn', async (req, res) => {
    const { isbn } = req.params;
    const getbook = await Books.findOne({ ISBN: isbn })
    console.log(getbook);

    if (getbook === null) {
        return res.json({ "error": `No Book Belongs To this ISBN : ${isbn}` });
    }
    return res.json(getbook);
})
app.get('/books/:category', async (req, res) => {
    const category = req.params.category;

    try {
        const books = await Books.find({ category: category });
        res.json(books);
    } catch (err) {
        console.error('Error finding books by category:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// authors

app.get("/authors", async (req, res) => {
    return res.json(await Authors.find());
})


app.get('/author/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const getAuthor = await Authors.find({ id: id })
        if (getAuthor === null) {
            return res.json({ "error": `No author Belongs To this id : ${id}` });
        }
        return res.json(getAuthor);
    } catch (err) {
        console.error('Error finding Author by id:', err);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})

app.get('/authors-isbn/:isbn', async (req, res) => {
    const { isbn } = req.params;
    try {
        const getAuthor = await Authors.find({books:isbn})

        return res.json(getAuthor);
    } catch (err) {
        console.error('Error finding Author by ISBN:', err);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})


//publication
app.get("/publications", async(req, res) => {
    try {
        const getPublication=await Publication.find()
        return  res.json(getPublication);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
})




//Post Book
app.post('/book', async (req, res) => {
    try {
      const newBook = await Books.create(req.body);
      res.status(201).json(newBook);
    } catch (err) {
      console.error('Error adding a new book:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//post author
app.post('/author', async (req, res) => {
    try {
      const newAuthor = await Authors.create(req.body);
      res.status(201).json(newAuthor);
    } catch (err) {
      console.error('Error adding a new Author:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//post publisher

app.post('/Publication', async (req, res) => {
    try {
      const newPublication = await Publication.create(req.body);
      res.status(201).json(newPublication);
    } catch (err) {
      console.error('Error adding a new Publication:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


//Put Update Book

app.put('/book/:ISBN', async (req, res) => {
    const ISBN = req.params.ISBN;
  
    try {
      const updatedBook = await Books.findOneAndUpdate({ ISBN: ISBN }, req.body, { new: true });
      
      if (!updatedBook) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      res.json(updatedBook);
    } catch (err) {
      console.error('Error updating book:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


//Mongo Db

const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA ONE TIME */
        // Books.insertMany(data.authors);
        // Authors.insertMany(data.authors);
        // Publication.insertMany(data.publications);
    })
    .catch((error) => console.log(`${error} did not connect`));
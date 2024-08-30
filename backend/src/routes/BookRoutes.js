import express from 'express';
import { Book } from '../models/BookModel.js';

const bookRouter = express.Router();

// get all books
bookRouter.get('/', async (req,res) => {
    try {
        const allBooks = await Book.find({})
        return res.status(200).json({
            count: allBooks.length,
            data: allBooks
        });
    } catch (error) {
        console.log(error.message)
    }
})
// get one book
bookRouter.get('/:id', async (req,res) => {

    const { id } = req.params;

    try {
        const oneBook = await Book.findById(id);
        return res.status(200).json(oneBook);
    } catch (error) {
        console.log(error.message);
    }
});

// create a new book
bookRouter.post('/', async (req,res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )
        {
            return res.status(400).send({
                message: 'send all required fields: title, author, publishYear'
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const book = await Book.create(newBook);

        return res.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.messsage})
    }
});

// edit a book
bookRouter.put('/:id', async (req,res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )
        {
            return res.status(400).send({
                message: 'send all required fields: title, author, publishYear'
            });
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(
            id, 
            req.body,
            {
                returnDocument: "after"
            }
        );

        if (!result){
            return res.status(404).json({message: 'Book not found'})
        }

        return res.status(200).json({message: 'Book updated succesfully', data: result})

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.messsage})

    }
});
// delet one book
bookRouter.delete('/:id', async (req,res) => {
    try {
        const { id } = req.params;

        const deleteBook = await Book.findByIdAndDelete(id);

        if(!deleteBook){
            return res.status(404).json({message: 'book not found!'})
        }

        return res.status(200).json({message: `The Book '${deleteBook.title}' has been deleted`})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.messsage})
    }
});

export default bookRouter;
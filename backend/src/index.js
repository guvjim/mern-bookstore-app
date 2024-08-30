import express from 'express';
import mongoose from 'mongoose'
import {PORT, mongoDBURL} from './config.js';
import bookRoutes from './routes/BookRoutes.js'
import cors from 'cors';

const app = express();

//  middleware for parsinf request body
app.use(express.json());

// middleware for handling cors policy
app.use(cors())
// allow custom origins
app.use(cors({
    origin: 'http://localhost:5555',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

// get book
app.get('/',(req,res) => {
    // console.log(req);
    return res.status(234).json({message: "oi, wahssssup"})
})
app.use('/books', bookRoutes);

mongoose.connect(mongoDBURL).then(
    (result) => {
        console.log('App connected to the DB');
        app.listen(PORT, () => {
            console.log(`app is listening to port: ${PORT}`);
        });

    }).catch((err) => {
     console.log(err)   
    });
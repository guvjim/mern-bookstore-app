import express from 'express';
import mongoose from 'mongoose'
import {PORT, mongoDBURL} from './config.js';

const app = express();

mongoose
.connect(mongoDBURL)
    .then((result) => {
        console.log('App connected to the DB');
        app.listen(PORT, () => {
            console.log(`app is listening to port: ${PORT}`);
        });

    }).catch((err) => {
     console.log(err)   
    });
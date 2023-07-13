import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js'

const app = express();

app.use(bodyParser.json({limit:"30mb",extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));
app.use(cors());


app.use('/posts',postRoutes);
app.use('/user',userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://atharv:atharv2611@cluster0.9gmrfb8.mongodb.net/",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`)))
.catch((error)=>console.log(error.message));

// module.exports = app;

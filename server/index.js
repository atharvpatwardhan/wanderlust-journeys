import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js'

const app = express();

app.use(bodyParser.json({limit:"30mb",extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));
app.use(cors({
  origin: ["wanderlust-journeys-frontend.vercel.app"],
  methods: ["POST","GET","PUT","DELETE"],
  credentials: true
}));


app.use('/posts',postRoutes);
app.use('/user',userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://atharv:atharv2611@cluster0.9gmrfb8.mongodb.net/",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`)))
.catch((error)=>console.log(error.message));

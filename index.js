import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import axios from 'axios';
import productRoute from './routes/productRoute.js'

// App config

const app =  express();
const port  =  process.env.PORT || 4000;
connectDB()

// middlewares

app.use(express.json())
app.use(cors())

// Api end points

app.get('/fetch-data', async(req,res)=>{
    try {
        const response =  await axios.get(process.env.PRODUCT_URL)
        res.json(response.data)
        await product.save()
        
    } catch (error) {
        // res.status(500).json({error: 'faied to fetch data'});
    }
})

// API end points

app.use('/api/product' , productRoute)

app.listen(port,()=> console.log("Serve Started on PORT: " + port)
)
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { restaurant } from './restaurant-data.js';

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/restaurants',(req,res)=>{
    res.json(restaurant);
});

app.post('/restaurants',(req,res)=> {
    restaurant.push(req.body);

    res.json({
        message: 'Restuarant data successfully added'
    });
})

app.put('/restaurants/:id',(req,res)=>{
    const newData = req.body;
    const resId = Number(req.params.id);

    const restuarantIndex = restaurant.findIndex(restuarant=> restuarant.id === resId);

    if (restuarantIndex !== -1) {
        restaurant[restuarantIndex] = {
            id: resId,
            ...newData
        }
        res.json({
            message: 'Restaurant data updated successfully'
        })
    } else {
        res.status(400).json({
            message: 'Resturant data not found'
        })
    }
})

app.delete('/restaurants/:id',(req,res)=> {
    const resId = Number(req.params.id);

    const restuarantIndex = restaurant.findIndex(restuarant=> restuarant.id === resId);

    if (restuarantIndex !== -1) {
        restaurant.splice(restuarantIndex, 1);

        res.json({
            message: 'Restaurant data deleted successfully'
        })
    } else {
        res.status(400).json({
            message: 'Resturant not found'
        })
    }
})

const PORT = 5111;
app.listen(PORT,(req,res)=>{
    console.log(`Backend server started at port ${PORT}`);
})
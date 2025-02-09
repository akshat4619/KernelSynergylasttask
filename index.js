require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const app=express();

const port=process.env.PORT || 5000;

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

//routes
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/products', require('./routes/ProductRoutes'));
app.use('/api/orders', require('./routes/OrderRoutes'));


//Test Route
app.get('/',(req,res)=>{
    res.send(' Advanced Api is running');
});

//listen port
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

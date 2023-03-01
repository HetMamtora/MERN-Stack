// Open terminal and run : npm init
// Install libraries : npm i express, npm i mongoose
// set connection string according to your mondoDB link
// check api on postman

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

/*mongoose.connect("mongodb://0.0.0.0:27071/Sample",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("Connected with MongoDB")
}).catch((err)=>{
    console.log(err)
})*/

mongoose.connect("mongodb://0.0.0.0:27017/Sample",{useNewUrlparser:true,useUnifiedTopology:true}).then(()=>{
    console.log("Connected to MongoDB.");
}).catch((err)=>{
    console.log(err)
});


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
})

const Product = new mongoose.model("Product",productSchema)

//CREATE PRODUCT
app.post("/api/v1/product/new",async(req,res)=>{
    const product = await Product.create(req.body)

    res.status(200).json({
        success:true,
        product
    })
})


//READ PRODUCT
app.get("/api/v1/products",async(req,res)=>{
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })
})


//UPDATE PRODUCT
app.put("/api/v1/product/:id",async(req,res)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not Found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        product
    })
})


//DELETE PRODUCT
app.delete("/api/v1/product/:id",async(req,res)=>{
    const product = await Product.findById(req.params.id);
    /*if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not Found"
        })
    }*/
    
    await product.remove();
    
    res.status(200).json({
        success:true,
        message:"Product is Deleted Successfully."
    })
})


app.listen(4500,()=>{
    console.log("Server is working on http://localhost:4500")
})
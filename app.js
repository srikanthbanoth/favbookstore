const { response, json } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Item = require("./models/item");

const port = process.env.PORT || 8000;

// const dbURI='mongodb+srv://srikanth:srikanth1234@cluster0.4zac3.mongodb.net/inventory_application?retryWrites=true&w=majority'
// setting up static css folder and ejs as template engine
const uri = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Connected to Database ")
        app.listen(port, () => {
            console.log(": server started")
        })        
    })
    .catch((err) => {
        console.log(err);
    })
app.use(express.static('public/stylesheets'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));



app.get("/", (request, response) => {
    Item.find()
    .then((result)=>{
        response.render("index",{items:result})
    })
    .catch((err)=>{
        console.log(err);
    })
    // response.render("index")
})

app.get("/item/:id",(req,res)=>{
    const id=req.params.id;
    Item.findById(id)
    .then((result)=>{
        res.render("single",{result});
    })
    .catch((err)=>{
        console.log(err);
    })
})

// Add route to add document into database
app.get("/add", (request, response) => {
    response.render("add");
})

app.post("/add", (request, response) => {
    const item = new Item({
        name: request.body.name,
        author: request.body.author,
        category: request.body.category,
        description: request.body.description
    })

    item.save()
    .then((result)=>{
        response.redirect("/");
        // response.send(result)
    })
    .catch((err)=>{
        // console.log(err);
        response.redirect("/add");
    })

})

app.delete('/item/:id',(req,res)=>{
    const id=req.params.id;
    Item.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/'})        
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get("/category",(req,response)=>{
    let category=[];
    Item.find()
    .then((result)=>{
        result.forEach(item=>{
            if(!category.includes(item.category)){
                category.push(item.category);
            }

        })

        console.log(category)
        // response.send(category)
        response.render('cat',{category})
    })
    .catch((err)=>console.error(err));
})

app.get("/items/category/:cat",(req,res)=>{
    const cat=req.params.cat;
    Item.find({category:cat})
    .then((data)=>{
        console.log(data);
        res.render("index", { items: data})
    })
    .catch((err)=>{
        console.error(err);
    })
})

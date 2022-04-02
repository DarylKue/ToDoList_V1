//packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//set up listen port
app.listen(3000, function(){
    console.log("server is running on port 3000...")
});

let items = ["Power on computer","Code JavaScript","Play video games"];

//get methods
app.get("/", function(req, res){
    let today = new Date();
    let options = {
        day : "numeric",
        weekday : "long",
        year : "numeric"
    };

    let day = today.toLocaleDateString("en-US",options);
    res.render("index", {kindOfDay: day, newItem: items});
});

app.post("/", function(req, res){
    let item = req.body.newItem;
    if (item === "") {
        res.render("noItem.ejs");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});

app.post("/noItem", function(req, res){
    res.redirect("/");
});
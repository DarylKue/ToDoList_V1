//packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { getDay, getDate } = require("./date");
const date = require(__dirname+"/date.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//set up listen port
app.listen(3000, function(){
    console.log("server is running on port 3000...")
});

//let items = ["Power on computer","Code JavaScript","Play video games"];

const items = [];
const workItems = [];

//get methods
app.get("/", function(req, res){

    const day = getDate();
    res.render("index", {listTitle: day, listItems: items});
});


app.post("/", function(req, res){
    const item = req.body.newItem;
    if (item === "") {
        res.render("noItem.ejs");
    }
    else{
        if(req.body.button === "Work"){
            workItems.push(item);
            res.redirect("/work");
        }
        else{
            items.push(item);
            res.redirect("/");

        }
    }

    console.log(req.body.button);
});

app.get("/work", function(req, res){
    res.render("index",{listTitle:"Work list", listItems: workItems});
});

app.post("/noItem", function(req, res){
    res.redirect("/");
});
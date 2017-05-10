/**
 * Created by Aula08-17 on 28/04/2017.
 */
// Set up
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://127.0.0.1/mean');

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(cors());

var Producto = mongoose.model('Producto',{
    nombre:String,
    descripcion:String,
    descripcionLarga:String,
    precio:Number,
    unidades:Number
});

app.get('/api/productos/read', function(req, res) {
    Producto.find({},function(err,productos){
        if(err){
            res.send(err);
        }
        res.send(productos);
    });
});

app.get('/api/producto/:id',function(req,res){
    Producto.findOne({_id:req.params.id},function(err,producto){
        if(err){
            res.send(err);
        }
        res.send(producto);
    });
});

// listen
app.listen(8080);
console.log("App listening on port 8080");
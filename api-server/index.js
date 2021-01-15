var express = require("express");
var app = express();

var bp = require('body-parser');
var cors = require('cors');

var lista = new Map();
var itemIndex = 1;

app.use(bp.json());
app.use(cors());
//app.options('*', cors()) 

//listar todos los items
app.get("/", function(pet, resp){
    resp.status(200)
    var datos = Array.from(lista.values())
    resp.send(datos)
})

app.patch("/:itemIndex", function(pet, resp) {
    var itemIndex = parseInt(pet.params.itemIndex);
    if (!isNaN(itemIndex)) {
        var objeto = lista.get(itemIndex);
        if (objeto) {
            var item = pet.body.item;
            if (item) {
                objeto.item = item;
            }
            resp.status(204);
            resp.end();
            console.log(objeto);
        }
        else {
            resp.status(404);
            resp.send({mensaje:"El item no existe"});
        }
    }
    else {
        resp.status(400);
        resp.send({mensaje:"el id debe ser numérico"});
        
    }
});

app.post("/", function(pet, resp){
    var item = pet.body.item;
    if (item) {
        var obj = {itemIndex:itemIndex, item:item};
        lista.set(itemIndex, obj);
        resp.status(201);
        resp.setHeader('Location','http://localhost:9000/'+itemIndex);
        itemIndex++;
        resp.send(obj);
    }
    else {
        resp.status(400)
        resp.send({mensaje:"falta el campo item"})
    }
});

app.delete('/:itemIndex', function(pet, resp){
    var itemIndex = parseInt(pet.params.itemIndex);
    //si no es un número, error
    if (isNaN(itemIndex)) {
        resp.status(400);
        resp.send({mensaje:"El dato debe ser numérico"});
    }
    else {
        //borramos el item del Map
        var objeto = lista.delete(itemIndex);
        if (objeto) {
            resp.status(200);
            resp.end();
        }
        else {
            resp.status(404);
            resp.end();
        }
    }
});

//poner en marcha el servidor
app.listen(9000, function(){
    console.log("Servidor escuchando en el 9000...");
});
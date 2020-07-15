const express = require('express')
const rotas = express.Router()
const programadores = require('./controladores/programadores') 
const clientes = require('./controladores/clientes') 

rotas.get('/', function(req, res) {
    return res.redirect("/programadores")
})

rotas.get('/programadores', programadores.index)
rotas.get('/programadores/create', programadores.create)
rotas.get('/programadores/:id', programadores.show)
rotas.get('/programadores/:id/edit', programadores.edit)
rotas.post("/programadores", programadores.post)
rotas.put("/programadores", programadores.put)
rotas.delete("/programadores", programadores.delete)


rotas.get('/clientes', clientes.index)
rotas.get('/clientes/create', clientes.create)
rotas.get('/clientes/:id', clientes.show)
rotas.get('/clientes/:id/edit', clientes.edit)
rotas.post("/clientes", clientes.post)
rotas.put("/clientes", clientes.put)
rotas.delete("/clientes", clientes.delete)


module.exports = rotas
const express = require('express')
const rotas = express.Router()
const programadores = require('./controladores/programadores') 

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


module.exports = rotas
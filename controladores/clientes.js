const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')

exports.index = function(req, res) {
    return res.render("clientes/listagem", { clientes: data.clientes })
}

exports.create = function(req, res) {
    return res.render('clientes/criar')
}

exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    birth = Date.parse(req.body.birth)

    let id = 1
    const lastcliente = data.clientes[data.clientes.length - 1]

    if (lastcliente) {
        id = lastcliente.id + 1
    }


    data.clientes.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect(`/clientes/${id}`)
    })
}


exports.show = function(req, res) {
    const { id } = req.params

    const foundcliente = data.clientes.find(function(cliente) {
        return id == cliente.id
    })

    if (!foundcliente) return res.send("cliente not found!")

    const cliente = {
        ...foundcliente,
        birth: date(foundcliente.birth).birthDay
    }

    return res.render("clientes/mostrar", { cliente })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundcliente = data.clientes.find(function(cliente) {
        return id == cliente.id
    })

    if (!foundcliente) return res.send("cliente not found!")


    const cliente = {
        ...foundcliente,
        birth: date(foundcliente.birth).iso
    }

    return res.render('clientes/editar', { cliente })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundcliente = data.clientes.find(function(cliente, foundIndex) {
        if( id == cliente.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundcliente) return res.send("cliente not found!")

    const cliente = {
        ...foundcliente,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.clientes[index] = cliente

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/clientes/${id}`)
    })

}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredclientes = data.clientes.filter(function(cliente){
        return cliente.id != id
    })

    data.clientes = filteredclientes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/clientes")
    })
}
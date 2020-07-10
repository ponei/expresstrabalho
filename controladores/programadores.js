const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

exports.index = function(req, res) {
    return res.render("programadores/listagem", { programadores: data.programadores })
}

exports.create = function(req, res) {
    return res.render('programadores/criar')
}

exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") {
            return res.send('error')
        }
    }


    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    let id = 1
    const lastprog = data.programadores[data.programadores.length - 1]

    if (lastprog) {
        id = lastprog.id + 1
    }


    data.programadores.push({
        id,
        ...req.body,
        created_at,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("write error")

        return res.redirect(`/programadores/${id}`)
    })

    // return res.send(req.body)
}

exports.show = function(req, res) {
    // req.params
    const { id } = req.params

    const foundprogramador = data.programadores.find(function(programador) {
        return id == programador.id
    })

    if (!foundprogramador) return res.send("error")

    const programador = {
        ...foundprogramador,
        age: age(foundprogramador.birth),
        services: foundprogramador.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundprogramador.created_at),
    }

    return res.render("programadores/mostrar", { programador })
}

exports.edit = function(req, res) {
    // req.params
    const { id } = req.params

    const foundprogramador = data.programadores.find(function(programador) {
        return id == programador.id
    })

    if (!foundprogramador) return res.send("error")


    const programador = {
        ...foundprogramador,
        birth: date(foundprogramador.birth).iso
    }

    return res.render('programadores/editar', { programador })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundprogramador = data.programadores.find(function(programador, foundIndex) {
        if( id == programador.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundprogramador) return res.send("error")

    const programador = {
        ...foundprogramador,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.programadores[index] = programador

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("write error")

        return res.redirect(`/programadores/${id}`)
    })

}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredprogramadores = data.programadores.filter(function(programador){
        return programador.id != id
    })

    data.programadores = filteredprogramadores

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("write error")

        return res.redirect("/programadores")
    })
}
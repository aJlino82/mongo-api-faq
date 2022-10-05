const express = require('express')
const app = express()

app.get('/produtos', function (req, res) {
    res.send('Olá mundo!')
})

app.listen(3001, function () {
    console.log('Servidor inicializando na porta 3001');
})
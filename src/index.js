const express = require('express');
const config = require('./server/config');

// Conexión a la base de datos
require('./database');

// Configurar express
const app = config(express());

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
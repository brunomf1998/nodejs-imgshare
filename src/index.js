const app = require('./app');

// Conexión a la base de datos
require('./database');

// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
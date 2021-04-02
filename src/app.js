const errhdl = require('errorhandler');
const exphbs = require('express-handlebars');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const routes = require('./routes');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");

const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./helpers'),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(multer({ dest: path.join(__dirname, './public/upload/temp') }).single('image'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.use(routes);

// Archivos estáticos
app.use('/public', express.static(path.join(__dirname, './public')));

// ErrorHandlers
if ('development' === app.get('env')) {
    app.use(errhdl);
}

module.exports = app;
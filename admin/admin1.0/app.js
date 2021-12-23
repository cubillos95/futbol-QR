const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const admin = require('./scr/modules/admin.js')
//****************************************************************** */
//seccion
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
// la cookie desaparese a las 24 horas
const oneDay = 1000 * 60 * 60 * 12;
//****************************************************************** */
//admin
//admin.atmin.crear('admin','admin','admin').then(x => console.log(x))
//admin.atmin.crear('admin','12345678?','user').then(x => console.log(x))
//****************************************************************** */

const app = express();

//***************************************************************** */
//manejo llamados json
app.use(express.json({ limit: '16mb' }));
app.use(express.json());
//***************************************************************** */
//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",   //clave secreta
    saveUninitialized: true,
    cookie: { maxAge: oneDay },                         //tiempo de valides de la cooki
    resave: false                                       //evita dos solicutudes paralelas
}));

//analizador de cookies
app.use(cookieParser());
//******************************************************************* */

//vistas y motor de plantillas
app.set('views', path.join(__dirname, './scr/views'));
app.set('view engine', 'ejs')
//manejo de post : json
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.use(require('./scr/router.js'))
// static files
app.use(express.static(path.join(__dirname, './scr/public')));




app.listen(3000, () => {
    console.log('Servidor ok')
})

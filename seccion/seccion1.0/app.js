const path = require('path');
var bodyParser = require('body-parser');

//******************************************************************* */
//servidor de secion configuracion
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();


//configuracion de inicio de seccion
// la cookie desaparese a las 24 horas
const oneDay = 1000 * 60 * 60 * 24;

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



//***************************************************************** */
//manejo llamados json
app.use(express.json({ limit: '16mb' }));
app.use(express.json());


//vistas y motor de plantillas
app.set('views', path.join(__dirname, './scr/views'));
app.set('view engine', 'ejs')
//manejo de post : json
app.use(express.urlencoded({ extended: true }));

/********************************************************* */
//ejemplo de inicio de session
const myusername = 'user1'
const mypassword = 'mypassword'


var session;      //variable para guardar la secion
//formulario
app.get('/', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.send("Secion iniciada <a href=\'/logout'>Cerrar</a>");
    } else
        res.render('form', { root: __dirname })
})
//session abierta
app.post('/user', (req, res) => {
    if (req.body.username == myusername && req.body.password == mypassword) {
        session = req.session;
        session.userid = req.body.username;
        res.send("Secion iniciada <a href=\'/logout'>Cerrar</a>");
    }
    else {
        res.send('Invalid username or password');
    }
})
//session abierta 2.0
app.get('/user', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.send("Secion iniciada <a href=\'/logout'>Cerrar</a>");
    } else
        res.render('form', { root: __dirname })
})
//cerrar session
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
/******************************************************** */
// static files
app.use(express.static(path.join(__dirname, './scr/public')));




app.listen(3000, () => {
    console.log('Servidor ok')
})
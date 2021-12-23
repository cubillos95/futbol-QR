const path = require('path');
const userLogin = require('./scr/user.js')
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
var session;      //variable para guardar la secion
//from
/********************************************************* */
//Login e inicio de seccion
//inicio de seccion
app.get('/formLogin', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.send("Secion iniciada <a href=\'/logout'>Cerrar</a>");
    } else
        res.render('form', { titulo: 'Register' })
})
//Autenticacion y secion abierta
app.post('/login', (req, res) => {
    const { username, pass } = req.body
    userLogin.user.autenticarLogin(username, pass).then(x => {
        if (x.res) {
            session = req.session;
            session.userid = x.id;
            res.send("Secion iniciada <a href=\'/logout'>Cerrar</a>");
        }
        else {
            res.send("Invalid username or password <a href=\'/logout'>volver a login</a>");
        }
    })
})
//Actualizar seccion abierta
app.get('/login', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.send("Secion iniciada <a href=\'/logout'>Cerrar</a>");
    } else
        res.render('form', { titulo: 'Register' })

})

//cerrar session
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/formLogin');
});
/******************************************************** */
// static files
app.use(express.static(path.join(__dirname, './scr/public')));




app.listen(3000, () => {
    console.log('Servidor ok')
})
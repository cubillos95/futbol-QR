const express = require('express');
const router = express.Router()
/******************************************************************** */
//******************************************************************* */
//modulo
const Login = require('./modules/form.js')
const admin = require('./modules/adminControl.js');
const user  = require('./modules/user.js');
const play = require('./modules/play.js')
const { send } = require('process');
//****************************************************************** */
var session;      //variable para guardar la secion
//****************************************************************** */
//****************************************************************** */
//**************************Logica del juego************************ */
//****************************************************************** */
//****************************************************************** */
//iniciar juego
router.post('/iniciarJuego',(req,res)=>{
    session = req.session;
    var hoy = new Date();
    if (session.userid) {
        const { equipoA ,equipoB ,user ,estado , campeonato} = req.body
        const juego = {
            equipoA : equipoA,
            equipoB : equipoB,
            campeonato:campeonato,
            user : user,
            name : session.nombre + ' ' + session.apellido,
            fecha : new Date(),
            codigo : String(hoy.getMonth()) + String(hoy.getDate()) + String(hoy.getHours()) + String(hoy.getMinutes()) + equipoA + equipoB,
            estado : estado

        }
        play.play.Inicio(juego,campeonato).then(x => res.send(x))
    }
    else{
        res.render('formulario')
    }
})






//****************************************************************** */
//****************************************************************** */
//**************************USER************************************ */
//****************************************************************** */
//****************************************************************** */

router.get('/perfilData',(req,res)=>{
    session = req.session;
    if (session.userid) {
        user.userCrud.desUser(session.name).then(x => res.send(x))
    }
    else{
        res.render('formulario')
    }
})


router.post('/consultarEquipos',(req,res)=>{
    session = req.session;
    if (session.userid) {
        user.userCrud.consultarEquipos(req.body.campeonato).then(x => res.send(x))
    }
    else{
        res.render('formulario')
    }
})

router.post('/eliminarEquipo',(req,res)=>{
    session = req.session;
    if (session.userid) {
        user.userCrud.eliminarEquipo(req.body.campeonato,req.body.equipo).then(x => res.send(x))
    }
    else{
        res.render('formulario')
    }
})

router.post('/leerEquiposEliminados',(req,res)=>{
    session = req.session;
    if (session.userid) {
       user.userCrud.leerEquiposEliminados(req.body.campeonato).then(x => res.send(x))
    }
    else{
        res.render('formulario')
    }
})
//tabla vs
router.post('/tablaVS',(req,res)=>{
    session = req.session;
    if (session.userid) {
        play.play.tablaVs(req.body.campeonato).then(x => res.send(x))
    }
    else{
        res.render('formulario')
    }
})
//actualizacion de tabla vs
router.post('/tablaVSactualizar',(req,res)=>{
    session = req.session;
    if (session.userid) {
        play.play.actualizacionVs(req.body.id,req.body.campeonato).then(x => res.send(x))
    }
    else{
        res.render('formulario')
    }
})
















//****************************************************************** */
//****************************************************************** */
//**************************ADMIN   CAMPEONATO********************** */
//****************************************************************** */
//****************************************************************** */

router.post('/crearCampeonato', (req, res) => {
    admin.admin.crearCampeonato(req.body.campeonato).then(x => res.send(x))
})


router.get('/listaCampeonatos', (req, res) => {
    admin.admin.listaCampeonatos().then(x => {
        res.send(x.databases)
    })
})

router.post('/subirEquipos', (req, res) => {
    admin.admin.subirEquipo(req.body[0].nombre, req.body[0].equipos, req.body[1].campeonato).then(
        x => res.send(x)
    )
})

router.post('/listaCollections', (req, res) => {
    admin.admin.listaCollections(req.body.campeonato).then(x => {
        res.send(x)
    })
})

//ojito
router.get('/consulta',(req,res)=>{
    admin.admin.consultaEquipo('campeonato-nacional','equipo-gatos').then(x =>res.send(x) )
})


router.get('/consultaUser',(req,res)=>{
    admin.admin.consultaUser().then(x=>res.send(x))
})


router.post('/ElemetUser',(req,res)=>{
    admin.admin.consulElemeUser(req.body.user).then(x => res.send(x))
})

router.post('/usuariosCampeonatos',(req,res)=>{
    const { user, campeonato,nombre,apellido,cedula } = req.body
    admin.admin.usuariosCampeonatos(user,campeonato,nombre,apellido,cedula).then(x => res.send(x))
})

//devuleve una lista del equipo con
//campeonato , equipo , nombre , apellido ,cedula
router.post('/listaDatosEquipo',(req,res)=>{
    const { campeonato ,equipo } = req.body
    admin.admin.listJugadores(campeonato,equipo).then(x => res.send(x))
})







//****************************************************************** */
//****************************************************************** */
//**************************LOGIN*********************************** */
//****************************************************************** */
//****************************************************************** */
router.get('/form', (req, res) => {
    session = req.session;
    if (session.userid) {
        if (session.userol == 'admin') { res.render('atmin') }
        if (session.userol == 'user') { res.render('user') }
    } else
        res.render('formulario')

})
//********************************************************************/
router.post('/Logit', (req, res) => {
    const { username, pass } = req.body
    Login.login.autenticarLogin(username, pass).then(x => {
        if (x.res) {
            session = req.session;
            session.userid = x.id
            session.userol = x.rol
            session.name = x.name
            session.nombre = x.nombre
            session.apellido = x.apellido
            if (session.userol == 'admin') { res.render('atmin') }
            if (session.userol == 'user') { res.render('user') }
        }
        else {
            res.send("Usuario no valido <a href=\'/logout'>volver a login</a>");
        }
    })
})
router.get('/Logit', (req, res) => {
    session = req.session;
    if (session.userid) {
        if (session.userol == 'admin') { res.render('atmin') }
        if (session.userol == 'user') { res.render('user') }
    } else
        res.render('formulario')

})
//********************************************************************/
//cerrar session
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/form');
});

//****************************************************************** */
//****************************************************************** */


module.exports = router
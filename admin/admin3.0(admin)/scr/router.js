const express = require('express');
const router = express.Router()
/******************************************************************** */
//******************************************************************* */
//modulo
const Login = require('./modules/form.js')
const admin = require('./modules/adminControl.js');
const { send } = require('process');
//****************************************************************** */
var session;      //variable para guardar la secion


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


router.get('/consulta',(req,res)=>{
    admin.admin.consultaEquipo('campeonato-nacional','equipo-gatos').then(x =>res.send(x) )
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
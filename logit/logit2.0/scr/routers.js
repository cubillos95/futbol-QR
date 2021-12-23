const express = require('express');


//const { MongoClient } = require('mongodb')
//var mongodb = require('mongodb')

const userLogin = require('./user.js')
const router = express.Router()
//***************************************************************** */
//***************************************************************** */
const url = 'mongodb://localhost:27017';

//***************************************************************** */
//creamos la estructura de la collection user(name:unique,pass)
//userLogin.user.collectionEstructure()

//Crear usuarios
/*
router.get('/111',(req,res)=>{
    res.render('Login',{titulo:'Register'})
})
//crear usuarios respuesta
router.post('/crearUser',(req,res)=>{
    const {username , pass } = req.body
    userLogin.user.subirFormulario(username,pass).then( x => res.send(x))
})
//***************************************************************** */
//Login
router.get('/formLogin', (req, res) => {
    res.render('Login', {
        titulo: 'Register',
        url: '/login'
    })
})
router.post('/login', (req, res) => {
    const { username, pass } = req.body
    userLogin.user.autenticarLogin(username, pass).then(x => {
        res.render('index', {
            titulo: 'Login',
            login: x
        })
    })
})

//***************************************************************** */



module.exports = router
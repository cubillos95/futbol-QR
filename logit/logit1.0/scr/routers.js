const express = require('express');


//const { MongoClient } = require('mongodb')
//var mongodb = require('mongodb')

const userLogin = require('./user.js')
const router = express.Router()
//***************************************************************** */
//***************************************************************** */
const url = 'mongodb://localhost:27017';

//creamos la estructura de la collection user(name:unique,pass)
//userLogin.user.collectionEstructure()


router.get('/',(req,res)=>{
    res.render('Login',{titulo:'Register'})
})


router.post('/crearUser',(req,res)=>{
    const {username , pass } = req.body
    userLogin.user.autenticarLogin(username,pass).then(x => console.log(x))
    userLogin.user.subirFormulario(username,pass).then( x => res.send(x))
    
})



module.exports = router
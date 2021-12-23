const express = require('express');
const router = express.Router()
/******************************************************************** */
//******************************************************************* */
//modulo
const Login = require('./modules/form.js')
//****************************************************************** */
var session;      //variable para guardar la secion
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


//************************************************ */

module.exports = router
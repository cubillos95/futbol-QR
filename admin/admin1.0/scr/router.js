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
        res.send("Secion iniciada <a href=\'/logout'>Cerrar</a>");
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
            session.userid = x.rol
            res.send("Secion iniciada <a href=\'/logout'>Cerrar</a>");
        }
        else {
            res.send("Invalid username or password <a href=\'/logout'>volver a login</a>");
        }
    })
})
router.get('/Logit', (req, res) => {
    session = req.session;
    console.log(session.userid)
    if (session.userid) {
        res.send("Secion iniciada <a href=\'/logout'>Cerrar</a>");
    } else
    res.redirect('/form');

})
//********************************************************************/
//cerrar session
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/form');
});


//************************************************ */

module.exports = router
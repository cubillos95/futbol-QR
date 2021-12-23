const path = require('path');
const express = require('express');
const app = express();
const mongoCrud = require('./scr/mongo.js')
//***************************************************************** */
//manejo llamados json
app.use(express.json({ limit: '16mb' }));
app.use(express.json());

//vistas y motor de plantillas
app.set('views', path.join(__dirname, './scr/views'));
app.set('view engine', 'ejs')
//manejo de post : json
app.use(express.urlencoded({ extended: true }));
//******************************************************* */
//form subir excel
app.get('/',(req,res)=>{
    res.render('subirExcel',{titulo:'subirExcel'})
})
//datos resividos
app.post('/upload',(req,res)=>{
    mongoCrud.mongo.subirDatos(req.body.nombre,req.body.equipos).then(x => res.send(x))
})
/******************************************************** */
// static files
app.use(express.static(path.join(__dirname, './scr/public')));




app.listen(3000, () => {
    console.log('Servidor ok')
})
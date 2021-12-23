const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');


const app = express();

//***************************************************************** */
//manejo llamados json
app.use(express.json({ limit: '16mb' }));
app.use(express.json());


//vistas y motor de plantillas
app.set('views', path.join(__dirname, './scr/views'));
app.set('view engine', 'ejs')
//manejo de post : json
app.use(bodyParser.urlencoded({ extended: true })); 


//routes
app.use(require('./scr/routers.js'))
// static files
app.use(express.static(path.join(__dirname, './scr/public')));




app.listen(3000,()=>{
    console.log('Servidor ok')
})

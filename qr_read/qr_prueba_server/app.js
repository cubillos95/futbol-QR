const express = require('express');
const path = require('path');
const app = express();

//vistas y motor de plantillas
app.set('views', path.join(__dirname, './'));
app.set('view engine', 'ejs')

// static files
app.use(express.static(path.join(__dirname, './js')));


app.get('/',(req,res)=>{
    res.render('index')
})


app.listen(3000, () => {
    console.log('Servidor ok')
})
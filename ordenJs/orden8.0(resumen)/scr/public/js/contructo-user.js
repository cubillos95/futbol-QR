import { eliminarMod } from "./modulosjs/eliminar.js";
import { llamada } from "./modulosjs/ajax.js"
import { encuentro } from "./modulosjs/user-encuentros.js"

import QrScanner from "/js/qr-scanner.min.js";
QrScanner.WORKER_PATH = '/js/qr-scanner-worker.min.js';

var id
var camp
var equiA
var equiB
var codigoUnico

const usuarioDato = window.document.getElementById('titulo').innerText

llamada.solicitudGet('/perfilData').
    then(datoLLamada => llamada.solicitudPosEstado(datoLLamada, usuarioDato).then(
        x => {
            if (x.estado == 1) { ContruirMenuInicio() }
            else {
                equiA = window.document.getElementById('equiA').innerText
                equiB = window.document.getElementById('equiB').innerText
                encuentro.scaner()
                id = x.id
                camp = x.campeonato
                codigoUnico = x.codigo
            }
        }))
//**************************************************************************** */
//menu Iniciar ,Resumen,Elimnar
const ContruirMenuInicio = () => {
    document.getElementById('menuIRE').innerHTML = "<div id='menu'>" +
        "<button id='iniciar'  type='submit'>Iniciar Encuentro</button>" +
        "<button id='Resumen' type='submit'>Resumen</button>" +
        "<button id='Eliminar' type='submit'>Eliminar Equipo</button>" +
        "</div>"
}

//**************************************************************************** */



window.document.getElementById('menuIRE').addEventListener('click', x => {
    if (x.target.id == 'Eliminar') {
        eliminarMod.EliminarElementosHtml()
        eliminarMod.CrearHtmlListaCampeonato('listaCamp', 'selectCampEli', 'Campeonatos')

        llamada.solicitudGet('/perfilData').then(datoLLamada =>
            eliminarMod.selector('selectCampEli', datoLLamada)
        )
    }
    //***************** */
    if (x.target.id == 'iniciar') {
        eliminarMod.EliminarElementosHtml()
        eliminarMod.CrearHtmlListaCampeonato('listaCampIni', 'selectCampIni', 'Campeonatos')

        llamada.solicitudGet('/perfilData').then(datoLLamada =>
            eliminarMod.selector('selectCampIni', datoLLamada)
        )
    }
    //***************** */
    if (x.target.id == 'Eliminar') {

    }
    //***************** */
})




//**************************************************************************** */

//***************************************************************** */
//***************************************************************** */
//***************************************************************** */
//********************************************************************** */
//modo Eliminar
//activacion para eventos generados dentro de aciones Eliminar
//
document.getElementById('acionesEliminar').addEventListener('click', x => {
    //selecionamos el campeonato y creamos el equipo
    if (x.target.id == 'selectCampEli') {
        const campeonato = document.getElementsByTagName('select')['selectCampEli'].selectedOptions[0].innerText
        eliminarMod.CrearHtmlListaEquipo('listaEqui', 'selectEquiEli', 'Equipos')
        llamada.solicitudPosExpecial(campeonato).then(datoLLamada =>
            eliminarMod.selectorEquipo('selectEquiEli', datoLLamada)
        )
    }
    //selecionamos el equipo a eliminar 
    if (x.target.id == 'selectEquiEli') {
        eliminarMod.Boton('BorrarEquipo', 'EliminarEquipo', 'Eliminar')
    }
    //si se preciona Eliminar
    if (x.target.id == 'EliminarEquipo') {
        const equipo = document.getElementsByTagName('select')['selectEquiEli'].selectedOptions[0].innerText
        const camp = document.getElementsByTagName('select')['selectCampEli'].selectedOptions[0].innerText
        if (confirm("esta seguro de Eliminar a :" + equipo)) {
            llamada.solicitudPos('/eliminarEquipo', JSON.stringify({
                campeonato: camp,
                equipo: equipo
            })).then(x => {
                alert(x)
                window.location.replace("/form")
            })
        }
        else {
            window.location.replace("/form")
        }
    }
})
//***************************************************************** */
//***************************************************************** */
//***************************************************************** */
//modo Iniciar




//activacion para eventos generados dentro de aciones Eliminar
//
document.getElementById('acionesIniciar').addEventListener('click', x => {
    //selecionamos el campeonato y creamos el equipoA
    if (x.target.id == 'selectCampIni') {
        const campeonato = document.getElementsByTagName('select')['selectCampIni'].selectedOptions[0].innerText
        eliminarMod.CrearHtmlListaEquipo('EqipoA', 'selectEquipoA', 'Equipo A')
        llamada.solicitudPosExpecial(campeonato).then(datoLLamada =>
            eliminarMod.selectorEquipo('selectEquipoA', datoLLamada)
        )
    }
    //Con los equipos no selecionados en el campeonato A creamos el equipoB
    if (x.target.id == 'selectEquipoA') {
        eliminarMod.CrearHtmlListaEquipo('EqipoB', 'selectEquipoB', 'Equipo B')
        eliminarMod.equipoB('selectEquipoA', 'selectEquipoB')
    }
    //Boton Iniciar Encuentro
    if (x.target.id == 'selectEquipoB') {
        eliminarMod.Boton('IniciarEncu', 'Iniciarvs', 'Iniciar')
    }
    //Iniciar Encuantro
    if (x.target.id == 'Iniciarvs') {
        const equipoA = document.getElementsByTagName('select')['selectEquipoA'].selectedOptions[0].innerText
        const equipoB = document.getElementsByTagName('select')['selectEquipoB'].selectedOptions[0].innerText
        const campeonato = document.getElementsByTagName('select')['selectCampIni'].selectedOptions[0].innerText
        const usuarioDato = window.document.getElementById('titulo').innerText
        llamada.solicitudPos('/iniciarJuego', JSON.stringify({
            equipoA: equipoA,
            equipoB: equipoB,
            campeonato: campeonato,
            user: usuarioDato,
            estado: 1
        })).then(x => {
            alert(x)
            window.location.replace("/form")
        })
    }
})
//************************************************************************* */
//************************************************************************* */
//************************************************************************* */
//contruir view scam
document.getElementById('Enjuego').addEventListener('click', x => {
    //finalizarEncuentro
    if (x.target.id == 'finE') {
        if (confirm("esta seguro de Finalizar el ENCUENTRO")) {
            llamada.solicitudPos('/tablaVSactualizar', JSON.stringify({
                campeonato: camp,
                id: id
            })).then(x => {

                llamada.solicitudPos('/EncuentrosDato', JSON.stringify({
                    campeonato: camp,
                    codigo: codigoUnico
                })).then(x => {
                    const dato = encuentro.puntos(x, equiA, equiB)
                    llamada.solicitudPos('/conclucion', JSON.stringify({
                        dato: dato,
                        campeonato: camp
                    })).then(x => {
                        alert(x)
                        window.location.replace("/form")
                    })
                })
            })
        }
        else {
            window.location.replace("/form")
        }
    }
    //************************************************* */
    //collections Encuentros
    if (x.target.id == 'gol') {
        const datoEnviar = {
            codigo: codigoUnico,
            campeonato: document.getElementById('h2Campeonato').innerText,
            equipo: document.getElementById('h2Equipo').innerText,
            nombre: document.getElementById('h2Name').innerText,
            cedula: document.getElementById('h2Cedula').innerText,
            accion: 'gol'
        }
        if (datoEnviar.campeonato == camp && equiA == datoEnviar.equipo || equiB == datoEnviar.equipo) {
            llamada.solicitudPos('/Encuentros', JSON.stringify(datoEnviar)).then(x => {
                alert(x)
                window.location.replace("/form")
            })

        }
        else {
            alert('Usuario Incorrecto')
            window.location.replace("/form")
        }
    }
    //************************************************* */
    if (x.target.id == 'amarilla') {
        const datoEnviar = {
            codigo: codigoUnico,
            campeonato: document.getElementById('h2Campeonato').innerText,
            equipo: document.getElementById('h2Equipo').innerText,
            nombre: document.getElementById('h2Name').innerText,
            cedula: document.getElementById('h2Cedula').innerText,
            accion: 'amarilla'
        }
        if (datoEnviar.campeonato == camp && equiA == datoEnviar.equipo || equiB == datoEnviar.equipo) {
            llamada.solicitudPos('/Encuentros', JSON.stringify(datoEnviar)).then(x => {
                alert(x)
                window.location.replace("/form")
            })

        }
        else {
            alert('Usuario Incorrecto')
            window.location.replace("/form")
        }
    }
    //************************************************* */
    if (x.target.id == 'roja') {
        const datoEnviar = {
            codigo: codigoUnico,
            campeonato: document.getElementById('h2Campeonato').innerText,
            equipo: document.getElementById('h2Equipo').innerText,
            nombre: document.getElementById('h2Name').innerText,
            cedula: document.getElementById('h2Cedula').innerText,
            accion: 'roja'
        }
        if (datoEnviar.campeonato == camp && equiA == datoEnviar.equipo || equiB == datoEnviar.equipo) {
            llamada.solicitudPos('/Encuentros', JSON.stringify(datoEnviar)).then(x => {
                alert(x)
                window.location.replace("/form")
            })

        }
        else {
            alert('Usuario Incorrecto')
            window.location.replace("/form")
        }
    }
})





//********************************************************************************************
//				Escaneo del qr video y obtencion de cedula
const video = document.getElementById('qr-video');



const qrScanner = new QrScanner(video, result => {

    //---- sacar el nombre de la tabla y sacar 
    //---- la cedula

    qrScanner.stop();
    const arrayDatos = result.split(',')
    if (arrayDatos.length == 4) {
        const sectionBotones = document.getElementById('Enjuego').innerHTML =
            "<div id='sectionUno'>" +
            "<h2 id='h2Campeonato'>" + arrayDatos[0] + "</h2>" +
            "<h2 id='h2Equipo'>" + arrayDatos[1] + "</h2>" +
            "<h2 id='h2Name'>" + arrayDatos[2] + "</h2>" +
            "<h2 id='h2Cedula'>" + arrayDatos[3] + "</h2>" +
            "<button id='gol'>Gol</button><br>" +
            "<button id='amarilla'>Amarilla</button><br>" +
            "<button id='roja'>Roja</button><br></div>"
    }

});


document.getElementById('Enjuego').addEventListener('change', (e) => {
    const input = e.target;
    if (input.checked) {
        qrScanner.start();
        const label = input.parentNode;
        label.parentNode.insertBefore(qrScanner.$canvas, label.nextSibling);

        qrScanner.$canvas.style.display = input.checked ? 'block' : 'none';
    }
    else {

        qrScanner.stop();
        qrScanner.$canvas.style.display = input.checked ? 'block' : 'none';
        if (document.getElementById('sectionUno')) { document.getElementById('sectionUno').remove() }
    }
});



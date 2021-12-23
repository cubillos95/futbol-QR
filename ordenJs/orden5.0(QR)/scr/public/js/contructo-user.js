import { eliminarMod } from "./modulosjs/eliminar.js";
import { llamada } from "./modulosjs/ajax.js"
import { encuentro } from "./modulosjs/user-encuentros.js"

var id
var camp

const usuarioDato = window.document.getElementById('titulo').innerText

llamada.solicitudGet('/perfilData').
    then(datoLLamada => llamada.solicitudPosEstado(datoLLamada, usuarioDato).then(
        x => {
            if (x.estado == 1) { ContruirMenuInicio() }
            else {
                encuentro.scaner()
                id = x.id
                camp = x.campeonato
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
            user:usuarioDato,
            estado:1
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
        if (confirm("esta seguro de dinalizar el ENCUENTRO")) {
            llamada.solicitudPos('/tablaVSactualizar', JSON.stringify({
                campeonato: camp,
                id: id
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
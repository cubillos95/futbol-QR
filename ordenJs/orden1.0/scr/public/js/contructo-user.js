import { eliminarMod } from "./modulosjs/eliminar.js";
import { llamada } from "./modulosjs/ajax.js"
//**************************************************************************** */
//menu Iniciar ,Resumen,Elimnar
const ContruirMenuInicio = () => {
    document.getElementById('menuIRE').innerHTML = "<div id='menu'>" +
        "<button id='iniciar'  type='submit'>Iniciar Encuentro</button>" +
        "<button id='Resumen' type='submit'>Resumen</button>" +
        "<button id='Eliminar' type='submit'>Eliminar Equipo</button>" +
        "</div>"
}
ContruirMenuInicio()
//********************************************************************** */
//modo Eliminar

//llamamos Creamos un selector
//luego lo llenamos 
window.document.getElementById('Eliminar').addEventListener('click', x => {
    eliminarMod.EliminarElementosHtml()
    eliminarMod.CrearHtmlListaCampeonato()

    llamada.solicitudGet('/perfilData').then(datoLLamada =>
        eliminarMod.selector('selectCampEli', datoLLamada)
    )
})
//
//activacion para eventos generados dentro de aciones
//
document.getElementById('aciones').addEventListener('click', x => {
    //selecionamos el campeonato y creamos el equipo
    if (x.target.id == 'selectCampEli') {
        const campeonato = document.getElementsByTagName('select')['selectCampEli'].selectedOptions[0].innerText
        eliminarMod.CrearHtmlListaEquipo()
        llamada.solicitudPosExpecial(campeonato).then(datoLLamada =>
            eliminarMod.selectorEquipo('selectEquiEli', datoLLamada)
        )
    }
    //selecionamos el equipo a eliminar 
    if (x.target.id == 'selectEquiEli') {
        const equipo = document.getElementsByTagName('select')['selectEquiEli'].selectedOptions[0].innerText
        eliminarMod.BotonEliminarEquipo()
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



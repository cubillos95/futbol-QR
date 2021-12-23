
const eliminarMod = {
    EliminarElementosHtml:()=>{
        window.document.getElementById('aciones').innerHTML =
        "<div id='listaCamp'></div>" +
        "<div id='listaEqui'></div>" +
        "<div id='BorrarEquipo'></div>"
    },
    //***************************************************** */
    CrearHtmlListaCampeonato:()=>{
        window.document.getElementById('listaCamp').innerHTML = "<select name='selectCamp' id='selectCampEli'></select>"
    },
    //***************************************************** */
    //***************************************************** */
    CrearHtmlListaEquipo:()=>{
        window.document.getElementById('listaEqui').innerHTML = "<select name='selectEqui' id='selectEquiEli'></select>"
    },
    //***************************************************** */
    //***************************************************** */
    BotonEliminarEquipo:()=>{
        window.document.getElementById('BorrarEquipo').innerHTML = "<button id='EliminarEquipo'>Eliminar</button>"
    },
    //***************************************************** */
    //***************************************************** */
    selector:(id ,dato)=>{
        const jsonDato = JSON.parse(dato)
        jsonDato.filter(x => {
            var add = document.createElement('option');
            add.value = x.campeonato;
            add.innerHTML = x.campeonato;
            document.getElementById(id).add(add);
        })
    },
    //***************************************************** */
    //***************************************************** */
    selectorEquipo:(id,dato)=>{
        dato.filter(x => {
            if (x.name.indexOf('equipo') == 0) {
                var add = document.createElement('option');
                add.value = x.name;
                add.innerHTML = x.name;
                document.getElementById(id).add(add);
            }
        })
    }
}

export { eliminarMod }

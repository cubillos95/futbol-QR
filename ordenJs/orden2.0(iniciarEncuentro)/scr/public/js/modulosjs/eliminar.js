
const eliminarMod = {
    EliminarElementosHtml: () => {
        window.document.getElementById('acionesEliminar').innerHTML =
            "<div id='listaCamp' style='display: flex;' ></div>" +
            "<div id='listaEqui' style='display: flex;' ></div>" +
            "<div id='BorrarEquipo'></div>"

        window.document.getElementById('acionesIniciar').innerHTML =
            "<div id='listaCampIni' style='display: flex;' ></div>" +
            "<div id='EqipoA' style='display: flex;'></div>" +
            "<div id='EqipoB' style='display: flex;'></div>" +
            "<div id='IniciarEncu'></div>"
    },
    //***************************************************** */
    CrearHtmlListaCampeonato: (id, selector ,name) => {
        window.document.getElementById(id).innerHTML = "<select name='" + selector + "' id='" + selector + "'></select>" +
        "<h5>" + name + "</h5>"
    },
    //***************************************************** */
    //***************************************************** */
    CrearHtmlListaEquipo: (id, selector ,name) => {
        window.document.getElementById(id).innerHTML = "<select name='" + selector + "' id='" + selector + "'></select>" +
        "<h5>" + name + "</h5>"
    },
    //***************************************************** */
    //***************************************************** */
    Boton: (id,idButton,mensaje) => {
        window.document.getElementById(id).innerHTML = "<button id='" + idButton + "'>" + mensaje + "</button>"
    },
    //***************************************************** */
    //***************************************************** */
    selector: (id, dato) => {
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
    selectorEquipo: (id, dato) => {
        dato.filter(x => {
            if (x.name.indexOf('equipo') == 0) {
                var add = document.createElement('option');
                add.value = x.name;
                add.innerHTML = x.name;
                document.getElementById(id).add(add);
            }
        })
    },
    //***************************************************** */
    //***************************************************** */
    equipoB:(idA,idB)=>{
        for (var i = 0; i < document.getElementById(idA).length; i++) {
            if (document.getElementsByTagName('select')[idA].selectedOptions[0].innerText != document.getElementById(idA)[i].value) {
                var add = document.createElement('option');
                add.value = document.getElementById(idA)[i].value
                add.innerHTML = document.getElementById(idA)[i].value
                document.getElementById(idB).add(add);
            }
        }
    }
}

export { eliminarMod }

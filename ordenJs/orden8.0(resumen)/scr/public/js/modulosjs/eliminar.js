
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
    CrearHtmlListaCampeonato: (id, selector, name) => {
        window.document.getElementById(id).innerHTML = "<select name='" + selector + "' id='" + selector + "'></select>" +
            "<h5>" + name + "</h5>"
    },
    //***************************************************** */
    //***************************************************** */
    CrearHtmlListaEquipo: (id, selector, name) => {
        window.document.getElementById(id).innerHTML = "<select name='" + selector + "' id='" + selector + "'></select>" +
            "<h5>" + name + "</h5>"
    },
    //***************************************************** */
    //***************************************************** */
    Boton: (id, idButton, mensaje) => {
        window.document.getElementById(id).innerHTML = "<button id='" + idButton + "'>" + mensaje + "</button>"
    },
    //***************************************************** */
    //selector fechas
    selectorFechas: (id, dato) => {
        var add = document.createElement('option');
        add.value = "";
        add.innerHTML = "----------";
        document.getElementById(id).add(add);
        dato.forEach(x => {
            var add = document.createElement('option');
            add.value = x;
            add.innerHTML = x;
            document.getElementById(id).add(add);
        })
    },
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
    //selectorCamp
    selectorCAmp: (id, dato) => {
        const jsonDato = JSON.parse(dato)
        var add = document.createElement('option');
        add.innerHTML = "----------";
        document.getElementById(id).add(add);
        jsonDato.filter(x => {
            if (x.name.indexOf('campeonato') == 0) {
                var add = document.createElement('option');
                add.value = x.name;
                add.innerHTML = x.name;
                document.getElementById(id).add(add);
            }
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
    equipoB: (idA, idB) => {
        for (var i = 0; i < document.getElementById(idA).length; i++) {
            if (document.getElementsByTagName('select')[idA].selectedOptions[0].innerText != document.getElementById(idA)[i].value) {
                var add = document.createElement('option');
                add.value = document.getElementById(idA)[i].value
                add.innerHTML = document.getElementById(idA)[i].value
                document.getElementById(idB).add(add);
            }
        }
    },
    //**************************************************** */
    //**************************************************** */
    //clasificar  datos conclucion del juego
    calsificacionFecha: (dato) => {
        const jsonDato = JSON.parse(dato)
        let fechas = []
        jsonDato.filter(x => fechas.push(x.fecha))
        let fechasUnicas = new Set(fechas);
        return fechasUnicas
    },
    //**************************************************** */
    //**************************************************** */
    //clasificar  datos fecha y encuentro
    calsificacionEncuentro: (dato, fecha) => {
        const jsonDato = JSON.parse(dato)
        let fechasDatos = []
        jsonDato.filter(x => {
            if (x.fecha == fecha) { fechasDatos.push(x.fecha + ',' + x.dato.equipoA.equipo + ',' + x.dato.equipoB.equipo) }
        })
        return (fechasDatos)
    },
    //**************************************************** */
    //**************************************************** */
    //Filtro por partido
    filtroPartido: (fecha, equipoA, equipoB, dato) => {
        const jsonDato = JSON.parse(dato)
        const jsonDatoEncuentor = []
        jsonDato.filter(x => {
            if (x.fecha == fecha && x.dato.equipoA.equipo == equipoA && x.dato.equipoB.equipo == equipoB) {
                jsonDatoEncuentor.push(x)
            }
        })
        return jsonDatoEncuentor
    },
    //*************************************************** */
    //*************************************************** */
    //limpiar hoja Resumen
    limpiarHoja: () => {
        window.document.getElementById('campeonatosResumen').innerHTML =
            "<div id='campeonatoTabla'></div>" +
            "<div id='campeonatoFechas'></div>" +
            "<div id='campeonatoEncuentros'></div>" +
            "<div class='row'>" +
            "<div class='column' id='idEquipoA'></div>" +
            "<div class='column' id='idEquipoB'></div>" +
            "</div>" +
            "<div id='resumenVS'></div>"
    }
}

export { eliminarMod }

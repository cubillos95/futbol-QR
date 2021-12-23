const resumenCRUD = {
    contruirResumen: (dato) => {
        const equipoA = dato[0].dato.equipoA.equipo
        const equipoB = dato[0].dato.equipoB.equipo


        let datoSCriptA = ''
        let datoSCriptB = ''
        for (var i = 0; i < dato[0].dato.acciones.length; i++) {
            if (dato[0].dato.acciones[i].equipo == equipoA) {
                datoSCriptA = datoSCriptA + "<h3>[" + dato[0].dato.acciones[i].accion + "] para " + dato[0].dato.acciones[i].jugador + "</h3><br>"
            }
            if (dato[0].dato.acciones[i].equipo == equipoB) {
                datoSCriptB = datoSCriptB + "<h3>[" + dato[0].dato.acciones[i].accion + "] para " + dato[0].dato.acciones[i].jugador + "</h3><br>"
            }
        }
        window.document.getElementById('idEquipoA').innerHTML =
            "<h2>" + dato[0].dato.equipoA.equipo + "</h2>" +
            "<h3>" + dato[0].dato.equipoA.goles + "</h3>" +
            datoSCriptA

        window.document.getElementById('idEquipoB').innerHTML =
            "<h2>" + dato[0].dato.equipoB.equipo + "</h2>" +
            "<h3>" + dato[0].dato.equipoB.goles + "</h3>" +
            datoSCriptB

        window.document.getElementById('resumenVS').innerHTML =
            "<h3>" + "Arbitro : " + dato[0].responsable + "</h3>"

    },
    //************************************************* */
    //Filtro clasificacion datos
    tablaGeneral: (datos, equipos) => {
        const jsonDato = JSON.parse(datos)
       
        let tablaGeneral = []
        for (var i = 0; i < equipos.length; i++) {
            let pg=0
            let pe=0
            let pp=0
            let ga=0
            let ge=0
            let punto=0
            jsonDato.filter(x => {
                if (x.dato.equipoA.equipo == equipos[i].name) {
                    if (x.dato.equipoA.punto == 3 ){pg++; punto = punto +3}
                    if (x.dato.equipoA.punto == 1 ){pe++; punto = punto +1}
                    if (x.dato.equipoA.punto == 0 )pp++
                    if(x.dato.equipoA.goles !=0)ga++
                    if(x.dato.equipoB.goles !=0)ge++
                }
                if (x.dato.equipoB.equipo == equipos[i].name) {
                    if (x.dato.equipoB.punto == 3 ){pg++; punto = punto +3}
                    if (x.dato.equipoB.punto == 1 ){pe++; punto = punto +1}
                    if (x.dato.equipoB.punto == 0 )pp++
                    if(x.dato.equipoB.goles !=0)ga++
                    if(x.dato.equipoA.goles !=0)ge++
                }
            })
            tablaGeneral.push({
                equipo:equipos[i].name,
                pg:pg,
                pe:pe,
                pp:pp,
                ga:ga,
                ge:ge,
                gd:ga-ge,
                punto:punto
            })
        }
        return(tablaGeneral)

    },
    //*********************************************************** */
    //Organizar de mayor a menor
    MayorMenor:(dato)=>{
        
        for (var i = 0; i < dato.length; i++) {
            for (var j = i; j < dato.length; j++) {
                if (dato[i].punto < dato[j].punto) {
                    const aux = dato[i]
                    dato[i] = dato[j]
                    dato[j] = aux
                }
            }
        }
        return(dato)
    }
}


export { resumenCRUD }
const encuentro = {
    //contrucion boton Scan
    scaner: () => {
        window.document.getElementById('incioEncuentro').innerHTML =
            "<video id='qr-video' style='display:none;'></video>qrScanner" +
            "<label class='switch'>" +
            "<input id='show-scan-region' type='checkbox'>" +
            "<span class='slider round'></span></label>" +
            "<br> <button id='finE'>Finalizar Encuentro</button>"
    },
    //
    scriptScam: () => {
        window.document.createElement('script').type = module
    },
    //gestion de puntos
    puntos: (dato, equipoA, equipoB) => {
        var contEquipoA = 0
        var contEquipoB = 0
        let acciones = []
        let goles = []
        const jsonDato = JSON.parse(dato)
        jsonDato.filter(x => {
            if (x.accion == 'gol') {
                if (x.equipo == equipoA) contEquipoA++
                if (x.equipo == equipoB) contEquipoB++
                goles.push({
                    equipo: x.equipo,
                    jugador: x.nombre,
                    accion: x.accion
                })
            }
            if (x.accion == 'amarilla') {
                acciones.push({
                    equipo: x.equipo,
                    jugador: x.nombre,
                    accion: x.accion
                })
            }
            if (x.accion == 'roja') {
                acciones.push({
                    equipo: x.equipo,
                    jugador: x.nombre,
                    accion: x.accion
                })
            }
        })
        var punto
        if (contEquipoA > contEquipoB) {
            punto = {
                caso: "ganador",
                equipoA: { equipo: equipoA, punto: 3, goles: contEquipoA },
                equipoB: { equipo: equipoB, punto: 0, goles: contEquipoB },
                acciones: acciones,
                goles:goles
            }
        }
        if (contEquipoA < contEquipoB) {
            punto = {
                caso: "ganador",
                equipoA: { equipo: equipoB, punto: 3, goles: contEquipoB },
                equipoB: { equipo: equipoA, punto: 0, goles: contEquipoA },
                acciones: acciones,
                goles:goles
            }
        }
        if (contEquipoA == contEquipoB) {
            punto = {
                caso: "empate",
                equipoA: { equipo: equipoB, punto: 1, goles: contEquipoB },
                equipoB: { equipo: equipoA, punto: 1, goles: contEquipoA },
                acciones: acciones,
                goles:goles
            }
        }
        return punto
    }
}

export { encuentro }
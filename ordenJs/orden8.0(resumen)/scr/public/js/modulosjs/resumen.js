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

    }
}


export { resumenCRUD }
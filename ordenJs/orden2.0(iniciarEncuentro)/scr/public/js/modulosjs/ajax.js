const llamada = {
    solicitudPos: (url, dato) => new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onload = () => { resolve(xhr.response) }
        xhr.send(dato)
    }),
    //************************************************* */
    solicitudGet: (url) => new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            resolve(xhr.response)
        }
        xhr.send()
    }),
    //************************************************* */
    //************************************************* */
    //debuelve una lista de equpios
    solicitudPosExpecial: (camp) => new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/leerEquiposEliminados", true);
        xhr.setRequestHeader("Content-Type", "application/json");


        xhr.onload = () => {
            const jsonDatoEquipos = JSON.parse(xhr.response)
            //*************************************************************************
            //print elementos de un usuario nombre ,apellido cedula
            const xhr2 = new XMLHttpRequest();
            xhr2.open("POST", "/consultarEquipos", true);
            xhr2.setRequestHeader("Content-Type", "application/json");
            xhr2.onload = () => {
                const jsonDato = JSON.parse(xhr2.response)
                for (var i = 0; i < jsonDatoEquipos.length; i++) {
                    jsonDato.splice(jsonDato.findIndex(e => e.name === jsonDatoEquipos[i].equipo), 1)
                }
                resolve(jsonDato)
            }
            xhr2.send(JSON.stringify({ campeonato: camp }));
        }
        xhr.send(JSON.stringify({ campeonato: camp }));
    }),
    //************************************************* */
    //************************************************* */
    //llamamos en busqueda de estados ativos
    //cuando se inicia un juego ,ese juego queda en esta activo
    solicitudPosEstado: (dato, usuario) => new Promise((resolve) => {
        const jsonDato = JSON.parse(dato)
        var contador = jsonDato.length
        jsonDato.filter(x => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", '/tablaVS', true);
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.onload = () => {
                const jsonDato = JSON.parse(xhr.response)
                jsonDato.filter(x => {
                    if (x.dato) {
                        if (x.dato.estado) {
                            if (usuario == x.dato.user) {
                                window.document.getElementById('Enjuego').innerHTML = 
                                "<h5>" + x.dato.equipoA + "</h5> vs <h5>" + x.dato.equipoB + "</h5>" +
                                "<div id='incioEncuentro'></div>"
                                resolve(0)
                            }
                        }
                    }

                })
                contador--
                if(contador == 0){ resolve (1)}
            }
            xhr.send(JSON.stringify({ campeonato: x.campeonato }));
        })
    }),
    //***************************************************** */

}

export { llamada }
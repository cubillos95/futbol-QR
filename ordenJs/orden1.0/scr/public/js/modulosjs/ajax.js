const llamada = {
    solicitudPos: (url,dato) => new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onload = () => {resolve(xhr.response)}
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

}

export { llamada }
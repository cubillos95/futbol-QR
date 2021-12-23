//************************************************************* */
//inicio Encuentro 
const inicioEncuentro = () => {
    const equipoA = document.getElementsByTagName('select')['equipoA'].selectedOptions[0].innerText
    const equipoB = document.getElementsByTagName('select')['equipoB'].selectedOptions[0].innerText
    const user = document.getElementById('titulo').innerText
    const campeonato = document.getElementsByTagName('select')['selectCamp'].selectedOptions[0].innerText
    if (confirm("esta seguro de Enfrentar : " + equipoA + ' vs ' + equipoB)) {

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/iniciarJuego", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            console.log(xhr.response)
        }
        xhr.send(JSON.stringify({
            equipoA: equipoA,
            equipoB: equipoB,
            user: user,
            estado : 1,
            campeonato : campeonato

        }));


    } else {
        window.location.replace("/form")
    }
}
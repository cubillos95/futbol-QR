const  encuentro = {
    //contrucion boton Scan
    scaner:()=>{
        window.document.getElementById('incioEncuentro').innerHTML = 
        "<video id='qr-video' style='display:none;'></video>qrScanner" +
        "<label class='switch'>" +
        "<input id='show-scan-region' type='checkbox'>" +
        "<span class='slider round'></span></label>" +
        "<br> <button id='finE'>Finalizar Encuentro</button>"
    },
    //
}

export { encuentro }
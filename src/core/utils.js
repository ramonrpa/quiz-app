function twoHouses(numero) {
    if (numero <= 9) {
        numero = "0" + numero
    }
    return numero
}

function secondsToTime(time) {
    time = time / 1000
    let hours = twoHouses(Math.trunc(time / 3600))
    let minutes = twoHouses(Math.trunc((time % 3600) / 60))
    let seconds = twoHouses(Math.trunc((time % 3600) % 60))
    return { hours, minutes, seconds }
}

export { secondsToTime }
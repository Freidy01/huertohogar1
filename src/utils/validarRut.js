export function validarRUT(run) {
    const cuerpo = run.slice(0, -1)
    const dv = run.slice(-1)
    let suma = 0
    let mult = 2

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += mult * parseInt(cuerpo[i])
        mult = mult < 7 ? mult + 1 : 2
    }

    const dvEsperado = 11 - (suma % 11)
    const dvCalc = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : String(dvEsperado)
    return dv === dvCalc
}

export function formatoRUTValido(run) {
    return /^[0-9]{7,8}[0-9K]$/.test(run)
}

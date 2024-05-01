export function convertirFormatoHora(hora: string) {
  // Dividir la hora en horas, minutos y segundos
  const partes = hora.split(':')

  // Tomar las horas y minutos
  const horas = partes[0]
  const minutos = partes[1]
  return `${horas}:${minutos}`
}

export function randomID(len: number) {
  let result = ''
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP'
  const maxPos = chars.length
  let i
  len = len || 5
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return result
}

// eslint-disable-next-line react-refresh/only-export-components
export function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1]
  return new URLSearchParams(urlStr)
}

export function convertirAFechaISO8601(fechaString: string) {
  // Dividir la cadena de fecha en año, mes y día
  const partesFecha = fechaString.split('-')
  const año = partesFecha[0]
  const mes = partesFecha[1]
  const dia = partesFecha[2]

  // Construir la cadena de fecha ISO 8601 con la hora y la zona horaria
  const fechaISO8601 = año + '-' + mes + '-' + Number(dia).toString()

  return fechaISO8601
}

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

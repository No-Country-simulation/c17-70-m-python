export function convertirFormatoHora(hora: string) {
  // Dividir la hora en horas, minutos y segundos
  const partes = hora.split(':')

  // Tomar las horas y minutos
  const horas = partes[0]
  const minutos = partes[1]
  return `${horas}:${minutos}`
}

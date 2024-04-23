import { URL } from '../constants'

export function getAppointment() {
  //const url = `${URL}/api/appointments/patient-appointments/patient-appointments/`
}

/*interface PropDoctorSpecialties {
  specialty?: string
}*/
export async function getDoctorSpecialties() {
  //const paramSpecialty = specialty ?? ''
  const url = `${URL}/api/appointments/appointments/appointments/?specialty=`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Referer': `${URL}`
    }
  })
  console.log(response)
  if (!response.ok) throw new Error('un problema en encontrar la especialidad')
  const json = await response.json()
  return json
}

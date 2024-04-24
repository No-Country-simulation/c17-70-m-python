import Cookies from 'js-cookie'
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
  const token = Cookies.get('csrftoken')
  const sessionid = Cookies.get('sessionid')
  console.log(`Token: ${token}, Session: ${sessionid}`)
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Referer': `${URL}`,
      'X-CSRFToken': `${token}`,
      'sessionid': `${sessionid}`
    }
  })
  console.log(response)
  if (!response.ok) throw new Error('un problema en encontrar la especialidad')
  const json = await response.json()
  return json
}

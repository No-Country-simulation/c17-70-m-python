import { URL } from '../constants'

interface Access {
  access: string
}

export function getAppointment() {
  //const url = `${URL}/api/appointments/patient-appointments/patient-appointments/`
}

export async function getDoctorSpecialties({ access }: Access) {
  //const paramSpecialty = specialty ?? ''
  const url = `${URL}/api/appointments/appointments/appointments/?specialty=`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Referer': `${URL}`,
      'Authorization': `Bearer ${access}`
    }
  })
  console.log(response)
  if (!response.ok) throw new Error('un problema en encontrar la especialidad')
  const json = await response.json()
  return json
}

export async function getSpecialties({ access }: Access) {
  const url = `${URL}/api/appointments/doctors-specialty/`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Referer': `${URL}`,
      'Authorization': `Bearer ${access}`
    }
  })
  if (!response.ok) throw new Error('un problema en encontrar la especialidad')
  const json = await response.json()
  return json
}

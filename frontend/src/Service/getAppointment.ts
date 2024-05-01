import { URL } from '../constants'
import { Access } from '../type'

async function getResponse(access: string, url: string, body?: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Referer': `${URL}`,
      'Authorization': `Bearer ${access}`
    },
    body
  })
  if (!response.ok)
    throw new Error(`ha ocurrido un problema. Status: ${response.status}`)
  const json = await response.json()
  return json
}

export async function getAppointment({ access }: Access) {
  const url = `${URL}/api/appointments/patient-appointments/patient-appointments/`
  const json = await getResponse(access, url)
  return json
}

interface PropsListDoctors extends Access {
  specialty?: string
}
export async function getDoctorSpecialties({
  access,
  specialty
}: PropsListDoctors) {
  const paramSpecialty = specialty ?? ''
  const url = `${URL}/api/appointments/appointments/appointments/?specialty=${paramSpecialty}`
  const json = await getResponse(access, url)
  return json
}

export async function getSpecialties({ access }: Access) {
  const url = `${URL}/api/appointments/doctors-specialty/`
  const json = await getResponse(access, url)
  return json
}
interface PostAppointment extends Access {
  id: number
}
export async function postAppointment({ access, id }: PostAppointment) {
  const url = `${URL}/api/appointments/book-appointment/`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': `${URL}`,
      'Authorization': `Bearer ${access}`
    },
    body: JSON.stringify({
      appointment_id: id
    })
  })
  if (!response.ok)
    throw new Error(`ha ocurrido un problema. Status: ${response.status}`)
  const json = await response.json()
  return json
}

export async function deleteAppointment({ access, id }: PostAppointment) {
  const url = `${URL}/api/appointments/patient-appointments/patient-appointments/${id}/`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Referer': `${URL}`,
      'Authorization': `Bearer ${access}`
    }
  })
  if (!response.ok)
    throw new Error(`ha ocurrido un problema. Status: ${response.status}`)
}

import { URL } from '../../constants'

interface Access {
  access: string
}
export async function getAppointmentDoctor({ access }: Access) {
  const url = `${URL}/api/appointments/doctor-appointments/`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Referer': `${URL}`,
      'Authorization': `Bearer ${access}`
    }
  })
  if (!response.ok)
    throw new Error(`ha ocurrido un problema. Status: ${response.status}`)
  const json = await response.json()
  return json
}

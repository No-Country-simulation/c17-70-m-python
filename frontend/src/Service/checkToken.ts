import { URL } from '../constants'

interface Token {
  access: string
}
export async function isValidToken({ access }: Token) {
  const url = `${URL}/api/auth/token/verify/`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': `${URL}`
    },
    body: JSON.stringify({ token: access })
  })
  if (!response.ok) {
    return [
      new Error(`ha ocurrido un problema. Status: ${response.status}`),
      false
    ]
  }
  return [undefined, true]
}

interface Props {
  userName: string
  password: string
}
const URL = 'https://c17-70-m-python-pr-69.onrender.com'
export async function getUser({ userName, password }: Props) {
  const url = `${URL}/api/auth/login/`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userName,
        password: password
      })
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error)
    throw error
  }
}

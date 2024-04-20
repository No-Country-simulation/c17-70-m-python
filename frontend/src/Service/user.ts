export async function getUser() {
  const url = 'https://randomuser.me/api/?results=1&seed=test'
  const result = await fetch(url)
  const json = await result.json()
  const { results } = json
  return results
}

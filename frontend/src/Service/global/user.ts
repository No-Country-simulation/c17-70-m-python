import { create } from 'zustand'
import { results } from '../../mocks/user.json'
import { Result } from '../../type'
interface UserState {
  user: Result[]
}

const dataUsermocks = results.map(result => ({
  ...result,
  dob: {
    ...result.dob,
    date: new Date(result.dob.date)
  },
  registered: {
    ...result.registered,
    date: new Date(result.registered.date)
  }
}))

export const useDataUser = create<UserState>(() => ({
  user: dataUsermocks
}))

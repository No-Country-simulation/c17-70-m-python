export type TypeButton = 'primary' | 'secondary' | 'tertiary'

export interface Login {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export interface Name {
  title: string
  first: string
  last: string
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}

type gender = 'Famele' | 'Male' | 'Others'

export interface Date {
  full: string
  short: string
  fromDate: string
  toDate: string
}
export interface Doctor {
  id: `${string}-${string}-${string}-${string}-${string}`
  first_name: string
  last_name: string
  specialty: string
  user_photo: string
  gender: string
}

export interface PropsDoctor {
  room_id: string
  id: number
  date: string
  start_time: string
  end_time: string
  cancelled: boolean
  doctor: Doctor
}

export interface Access {
  access: string
}

export interface Meeting extends PropsDoctor {
  patient: Patient
}

export interface Patient {
  id: string
  user_photo: string
  email: string
  first_name: string
  last_name: string
  id_number: number
  birthdate: Date
  country: string
  gender: string
  phone_number: string
  role: number
}

import { type Timestamp } from 'firebase/firestore'

interface tProfile {
  id: string
  userName: string
  mailAddress: string
  password: string
}

export type { tProfile }

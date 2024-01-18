import { type Timestamp } from 'firebase/firestore'

interface inArrayMap {
  userID: string
  start: Timestamp
  end: Timestamp
}

export type { inArrayMap }

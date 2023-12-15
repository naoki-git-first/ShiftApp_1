import { type Timestamp } from 'firebase/firestore'

interface Application {
  storeID: string
  userID: string
  userName: string
  updatedAt: Timestamp
}

export type { Application }

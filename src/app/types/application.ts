import { type Timestamp } from 'firebase/firestore'

interface Application {
  storeID: string
  userID: string
  userName: string
  createdAt: Timestamp
}

export type { Application }

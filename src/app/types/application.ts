import { type Timestamp } from 'firebase/firestore'

interface Application {
  id: string
  storeName: string
  userID: string
  userName: string
  createdAt: Timestamp
}

export type { Application }

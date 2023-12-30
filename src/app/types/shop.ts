import { type Timestamp } from 'firebase/firestore'

interface Shop {
  id: string
  shopName: string
  shopManager: string
  address: string
  businessDay: string
  regularClosingDay: string
  member: string[]
  updatedAt: Timestamp
}

export type { Shop }

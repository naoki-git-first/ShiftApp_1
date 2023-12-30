import { type Timestamp } from 'firebase/firestore'
import { type MemberArray } from './member-array'

interface Shop {
  id: string
  shopName: string
  shopManager: string
  address: string
  businessDay: string
  regularClosingDay: string
  member: MemberArray[]
  updatedAt: Timestamp
}

export type { Shop }

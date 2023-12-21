import { Button, View, Text, FlatList } from 'react-native'
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'

import { db, auth } from '../../config'
import { useEffect, useState } from 'react'
import { type TimelineEventProps } from 'react-native-calendars'

// const handlePress = (): void => {
//   // データの追加
//   addDoc(collection(db, 'shifts'), {
//   })
//     .then(() => {
//       console.log('success')
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// }
const getColorByStore = (store: string): string => {
  switch (store) {
    case '梅田':
      return '#ff0000' // 例: StoreAの場合は赤色
    case '難波':
      return '#00ff00' // 例: StoreBの場合は緑色
    // 他のストアに対する色のマッピングを追加
    default:
      return '#000000' // デフォルトの色
  }
}

const firebasetest = (): JSX.Element => {
  const [shifts, setShifts] = useState<TimelineEventProps[]>([])
  const myShifts: Array<{ date: string }> = []
  const addDots: { [key: string]: { dots: Array<{ key: string; color: string }> } } = {}
  useEffect(() => {
    const ref = collection(db, 'shifts')
    const q = query(ref, orderBy('start', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteShifts: TimelineEventProps[] = []
      snapshot.forEach((doc) => {
        const { start, end, userID, userName, store } = doc.data()
        // カラーコードを取得する
        const color = getColorByStore(store)
        // ログイン中のユーザがシフトに入っている日付の取得
        const uid = 'AeZaAzRMxKgwUfDM9x8Yqo7UlI23'
        // auth.currentUser?.uid
        if (uid === userID) {
          myShifts.push(start.toDate().toISOString().split('T')[0])
        }
        remoteShifts.push({
          id: doc.id,
          title: userName,
          color,
          start: start.toDate().toISOString(),
          end: end.toDate().toISOString()
        })
      })
      setShifts(remoteShifts)
      myShifts.forEach((item, index) => {
        const key = `${index}`
        const date = item.date
        // 各日付ごとにdotsを持つオブジェクトを作成し、addDotsに追加
        addDots[date] = {
          dots: [{ key, color: 'red' }]
        }
      })
      // console.log(myShifts)
      // console.log(addDots)
    })
    return unsubscribe
  }, [])

  return (
    <View>
        {/* <Button title="Handle Firebase" onPress={handlePress}/> */}
      <FlatList
        data={shifts}
        keyExtractor={(item) => item.id ?? ''}
        renderItem={({ item }) => (
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Title: {item.title}</Text>
            <Text>Color: {item.color}</Text>
            <Text>Start: {item.start}</Text>
            <Text>End: {item.end}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default firebasetest

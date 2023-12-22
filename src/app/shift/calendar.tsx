import { groupBy } from 'lodash'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import {
  CalendarProvider,
  ExpandableCalendar,
  TimelineList,
  type TimelineEventProps,
  CalendarUtils
} from 'react-native-calendars'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db, auth } from '../../config'

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

const calendar = (): JSX.Element => {
  const [shifts, setShifts] = useState<TimelineEventProps[]>([])
  // const myShifts: string[] = []
  const [markedDates, setMarkedDates] = useState<{ [key: string]: { dots: Array<{ color: string }> } }>({})
  useEffect(() => {
    const ref = collection(db, 'shifts')
    const q = query(ref, orderBy('start', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteShifts: TimelineEventProps[] = []
      const newMarkedDates: { [key: string]: { dots: Array<{ color: string }> } } = {}
      snapshot.forEach((doc) => {
        // firebaseからデータを取得
        const { start, end, userID, userName, store } = doc.data()
        // カラーコードを取得する
        const color = getColorByStore(store)
        // ログイン中のユーザがシフトに入っている日付の取得
        if (auth.currentUser?.uid === userID) {
          const date = start.toDate().toISOString().split('T')[0]
          newMarkedDates[date] = {
            dots: [{ color: 'red' }]
          }
        }
        // TimelineEventProps[]型でデータを格納
        remoteShifts.push({
          id: doc.id,
          title: userName,
          color,
          start: start.toDate().toISOString(),
          end: end.toDate().toISOString()
        })
      })
      // useStateでカレンダーを更新
      setShifts(remoteShifts)
      setMarkedDates(newMarkedDates)
      console.log('calendar updated')
    })
    return unsubscribe
  }, [])
  // 日付ごとにグループ化(date : EVENTS[]の形)
  const eventsByDate = groupBy(shifts, e => CalendarUtils.getCalendarDateString(e.start)) as Record<string, TimelineEventProps[]>

  return (
    <SafeAreaView style = {{ flex: 1 }}>
      <CalendarProvider
        date={new Date().toString()} // カレンダーの初期日付に現在の日付をString型で設定
      >
        <ExpandableCalendar // ExpandableCalendarの表示
        markingType={'multi-dot'}
        markedDates={markedDates}
        />
        <TimelineList // TimelineListの表示
          events={eventsByDate} // イベントリストを格納(date : EVENTS[]の形)
        />
      </CalendarProvider>
    </SafeAreaView>
  )
}

export default calendar

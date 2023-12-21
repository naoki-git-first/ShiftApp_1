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
import { db } from '../../config'

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
  // // 各日付に対して複数のドットを指定
  // const MyShifts = {
  //   '2023-12-15': {
  //     dots: [
  //       { key: '1', color: 'red' }
  //     ]
  //   },
  //   '2023-12-20': {
  //     dots: [
  //       { key: '3', color: '#00ff00' },
  //       { key: '4', color: 'rgb(0, 0, 255)' }
  //     ]
  //   }
  // }

  // // 仮のイベントデータ
  // const EVENTS: TimelineEventProps[] = [
  //   { id: '1', start: '2023-12-15T09:00:00', end: '2023-12-15T10:30:00', title: '♡みく♡', color: '#ff69b4' },
  //   { id: '1', start: '2023-11-24T09:00:00', end: '2023-11-24T10:30:00', title: 'Meeting 1', color: 'red' },
  //   { id: '1', start: '2023-11-24T09:00:00', end: '2023-11-24T10:30:00', title: 'Meeting 1', color: 'green' },
  //   { id: '1', start: '2023-11-24T09:00:00', end: '2023-11-24T10:30:00', title: 'Meeting 1', color: 'purple' },
  //   { id: '2', start: '2023-11-23T11:00:00', end: '2023-11-23T12:30:00', title: 'Meeting 2', color: 'green' }
  // ]

  // // 日付ごとにグループ化(date : EVENTS[]の形)
  // const eventsByDate = groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)) as Record<string, TimelineEventProps[]>

  const [shifts, setShifts] = useState<TimelineEventProps[]>([])
  const myShifts: Array<{ date: string }> = []
  const addDots: { [key: string]: { dots: Array<{ key: string; color: string }> } } = {}
  useEffect(() => {
    const ref = collection(db, 'shifts')
    const q = query(ref, orderBy('start', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteShifts: TimelineEventProps[] = []
      snapshot.forEach((doc) => {
        // firebaseからデータを取得
        const { start, end, userID, userName, store } = doc.data()
        // カラーコードを取得する
        const color = getColorByStore(store)
        // ログイン中のユーザがシフトに入っている日付の取得
        const uid = 'AeZaAzRMxKgwUfDM9x8Yqo7UlI23'
        // auth.currentUser?.uid
        if (uid === userID) {
          myShifts.push(start.toDate().toISOString().split('T')[0])
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
      // useStateでshiftを更新
      setShifts(remoteShifts)
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
        markedDates={addDots}
        />
        <TimelineList // TimelineListの表示
          events={eventsByDate} // イベントリストを格納(date : EVENTS[]の形)
        />
      </CalendarProvider>
    </SafeAreaView>
  )
}

export default calendar

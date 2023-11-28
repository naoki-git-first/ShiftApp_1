import { groupBy } from 'lodash'
import { SafeAreaView } from 'react-native'
import {
  CalendarProvider,
  ExpandableCalendar,
  TimelineList,
  type TimelineEventProps,
  CalendarUtils
} from 'react-native-calendars'

const calendar = (): JSX.Element => {
  // 仮のイベントデータ
  const EVENTS: TimelineEventProps[] = [
    { id: '1', start: '2023-11-24T09:00:00', end: '2023-11-24T10:30:00', title: 'Meeting 1', color: 'blue' },
    { id: '1', start: '2023-11-24T09:00:00', end: '2023-11-24T10:30:00', title: 'Meeting 1', color: 'red' },
    { id: '1', start: '2023-11-24T09:00:00', end: '2023-11-24T10:30:00', title: 'Meeting 1', color: 'green' },
    { id: '1', start: '2023-11-24T09:00:00', end: '2023-11-24T10:30:00', title: 'Meeting 1', color: 'purple' },
    { id: '2', start: '2023-11-23T11:00:00', end: '2023-11-23T12:30:00', title: 'Meeting 2', color: 'green' }
  ]

  // 日付ごとにグループ化(date : EVENTS[]の形)
  const eventsByDate = groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)) as Record<string, TimelineEventProps[]>

  return (
    <SafeAreaView style = {{ flex: 1 }}>
      <CalendarProvider
        date={new Date().toString()} // カレンダーの初期日付に現在の日付をString型で設定
      >
        <ExpandableCalendar // ExpandableCalendarの表示
        />
        <TimelineList // TimelineListの表示
          events={eventsByDate} // イベントリストを格納(date : EVENTS[]の形)
        />
      </CalendarProvider>
    </SafeAreaView>
  )
}

export default calendar

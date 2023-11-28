import { useState } from 'react'
import { SafeAreaView, Button } from 'react-native'
import Modal from 'react-native-modal'
import { groupBy } from 'lodash'
import {
  Calendar,
  CalendarProvider,
  TimelineList,
  type TimelineEventProps,
  CalendarUtils
} from 'react-native-calendars'

const calendar2 = (): JSX.Element => {
  const [values, setValues] = useState({
    MarkedDates: {},
    toggleModal: false,
    Initial_Date: ''
  })

  const handleDayPress = (day: any): void => {
    const selectedDate = day.dateString // タップされた日付を'yyyy-mm-dd'の形で取得

    // selectedDateに'blue'の〇マークをつける
    const newMarkedDates = { [selectedDate]: { selected: true, selectedColor: 'blue' } }

    setValues({ ...values, MarkedDates: newMarkedDates, toggleModal: !values.toggleModal, Initial_Date: selectedDate })
  }
  // モーダルを閉じる
  const toggleModal = (): void => {
    setValues({ ...values, toggleModal: !values.toggleModal })
  }
  // 仮のイベントデータ
  const EVENTS: TimelineEventProps[] = [
    { id: '1', start: '2023-11-24T09:00:00', end: '2023-11-24T10:30:00', title: 'Meeting 1', color: 'blue' },
    { id: '2', start: '2023-11-23T11:00:00', end: '2023-11-23T12:30:00', title: 'Meeting 2', color: 'green' }
  ]

  const eventsByDate = groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)) as Record<string, TimelineEventProps[]>
  return (
    <SafeAreaView>
      <Calendar
      enableSwipeMonths={true} // スワイプで月を移動できるようにする
      onDayPress={handleDayPress} // 日付がタップされたときhandleDayPressを呼び出す
      markedDates={values.MarkedDates} // markedDatesに基づいて日付にマークをつける
      />
      <Modal isVisible={values.toggleModal} style={{ margin: 0, padding: 0 }}>
          <SafeAreaView style={{ flex: 1 }}>
              <Button title="モーダルを閉じる" onPress={toggleModal} />
              <CalendarProvider date={values.Initial_Date}>
              <TimelineList
              events={eventsByDate}
              />
              </CalendarProvider>
          </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

export default calendar2

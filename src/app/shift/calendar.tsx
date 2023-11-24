// import { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Calendar, CalendarProvider, ExpandableCalendar, TimelineList } from 'react-native-calendars'

const calendar = (): JSX.Element => {
  // const [markedDates, setMarkedDates] = useState({}) // setMarkedDatesに新たな値が来たら更新

  // const handleDayPress = (day: any): void => {
  //   const selectedDate = day.dateString // タップされた日付を'yyyy-mm-dd'の形で取得

  //   // selectedDateに'blue'の〇マークをつける
  //   const newMarkedDates = { [selectedDate]: { selected: true, selectedColor: 'blue' } }
  //   setMarkedDates(newMarkedDates)
  // }
  const newEvent = {
    id: 'draft',
    start: '10:00:00',
    end: '12:00:00',
    title: 'New Event',
    color: 'white'
  }
  const eventsByDate = {
    '2023-11-23': [newEvent]
  }
  return (
    <SafeAreaView style = {{ flex: 1 }}>
      {/* <Calendar
        enableSwipeMonths={true} // スワイプで月を移動できるようにする
        onDayPress={handleDayPress} // 日付がタップされたときhandleDayPressを呼び出す
        markedDates={markedDates} // markedDatesに基づいて日付にマークをつける
      /> */}
      <CalendarProvider
        date={new Date().toString()} // カレンダーの初期日付に現在の日付をString型で設定
      >
        <ExpandableCalendar
        />
        <TimelineList
          events={eventsByDate}
        />
      </CalendarProvider>
    </SafeAreaView>
  )
}

export default calendar

import { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Calendar } from 'react-native-calendars'

const calendar = (): JSX.Element => {
  const [markedDates, setMarkedDates] = useState({}) // setMarkedDatesに新たな値が来たら更新

  const handleDayPress = (day: any): void => {
    const selectedDate = day.dateString // タップされた日付を'yyyy-mm-dd'の形で取得

    // selectedDateに'blue'の〇マークをつける
    const newMarkedDates = { [selectedDate]: { selected: true, selectedColor: 'blue' } }
    setMarkedDates(newMarkedDates)
  }
  return (
    <SafeAreaView>
      <Calendar
      enableSwipeMonths={true} // スワイプで月を移動できるようにする
      onDayPress={handleDayPress} // 日付がタップされたときhandleDayPressを呼び出す
      markedDates={markedDates} // markedDatesに基づいて日付にマークをつける
      />
    </SafeAreaView>
  )
}

export default calendar

// React
import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

interface Props {
  date: string
  onAddTime: (date: string, start: Date, end: Date) => void
}

// バイトの開始と終了時間のpickerコンポーネント
const SelectWorkTime = (props: Props): JSX.Element => {
  const { date, onAddTime } = props
  // start
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false)
  const [selectedStartTime, setSelectedStartTime] = useState(null)
  // end
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false)
  const [selectedEndTime, setSelectedEndTime] = useState(null)
  // check
  const [isChecked, setIsChecked] = useState(false)
  const [startCheck, setStartCheck] = useState(false)
  const [endCheck, setEndCheck] = useState(false)

  const showStartTimePicker = (): void => { // start pickerの表示
    setStartTimePickerVisibility(true)
  }
  const showEndTimePicker = (): void => { // end pickerの表示
    setEndTimePickerVisibility(true)
  }

  const hideStartTimePicker = (): void => { // start pickerの非表示
    setStartTimePickerVisibility(false)
  }
  const hideEndTimePicker = (): void => { // end pickerの非表示
    setEndTimePickerVisibility(false)
  }

  const handleStartConfirm = (date: any): void => { // start 確認ボタンの処理
    hideStartTimePicker()
    setSelectedStartTime(date)
    setStartCheck(true)
    setIsChecked(false)
  }
  const handleEndConfirm = (date: any): void => { // end 確認ボタンの処理
    hideEndTimePicker()
    setSelectedEndTime(date)
    setEndCheck(true)
    setIsChecked(false)
  }
  // 00:00の形に整形する
  const formatTime = (time: Date): string => {
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const saveSelectedTime = (): void => {
    // 親コンポーネントに選択された時間を追加する
    onAddTime(date, selectedStartTime, selectedEndTime)
    setIsChecked(true) // ボタンを非活性化
  }

  return (
    <View style={styles.rowContainer}>
      <Button // 開始時刻のpicker表示
        title={selectedStartTime ? formatTime(selectedStartTime) : '未選択'}
        onPress={showStartTimePicker}
      />
      <DateTimePickerModal // start
        isVisible={isStartTimePickerVisible} // 表示と非表示
        mode="time"
        minuteInterval={10} // 10分刻みに設定
        onConfirm={handleStartConfirm} // 確定
        onCancel={hideStartTimePicker} // キャンセル
      />
      <Text style={styles.tilde}>~</Text>
      <Button // 終了時刻のpicker表示
        title={selectedEndTime ? formatTime(selectedEndTime) : '未選択'}
        onPress={showEndTimePicker}
      />
      <DateTimePickerModal // end
        isVisible={isEndTimePickerVisible} // 表示と非表示
        mode="time"
        minuteInterval={10} // 10分刻みに設定
        onConfirm={handleEndConfirm} // 確定
        onCancel={hideEndTimePicker} // キャンセル
        is24Hour={true} // 24時間表示
      />
      { startCheck &&
        endCheck &&
        (<Button
          title={isChecked ? '✔' : '追加'}
          onPress={saveSelectedTime}
          disabled={isChecked}
        />)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tilde: {
    fontSize: 28
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  }
})

export default SelectWorkTime

import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config'

const SelectWorkTime = (): JSX.Element => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)
  const [selectedTime, setSelectedTime] = useState(null)

  const showTimePicker = (): void => { // pickerの表示
    setTimePickerVisibility(true)
  }

  const hideTimePicker = (): void => { // pickerの非表示
    setTimePickerVisibility(false)
  }

  const handleConfirm = (date: any): void => { // 確認ボタンの処理
    hideTimePicker()
    setSelectedTime(date)
    // Handle the selected date
  }

  const saveSelectedTime = (): void => {
    const ref = collection(db, 'dateCheck')
    addDoc(ref, {
      selectedTime
    })
      .then((docRef) => {
        console.log('success', docRef.id)
      })
      .catch((error) => {
        console.log(error, 'エラー')
      })
  }

  return (
    <View style={styles.rowContainer}>
      <Button
        title={selectedTime ? selectedTime.toString() : '未選択'}
        onPress={showTimePicker}
      />
      {/* <Button title="Save selected DateTime" onPress={saveSelectedDateTime} /> */}

      <DateTimePickerModal
        isVisible={isTimePickerVisible} // 表示と非表示
        mode="time"
        onConfirm={handleConfirm} // 確定
        onCancel={hideTimePicker} // キャンセル
      />
      <Text style={styles.tilde}>~</Text>
      <Button
        title={selectedTime ? selectedTime.toString() : '未選択'}
        onPress={showTimePicker}
      />
      {/* <Button title="Save selected DateTime" onPress={saveSelectedTime} /> */}

      <DateTimePickerModal
        isVisible={isTimePickerVisible} // 表示と非表示
        mode="time"
        onConfirm={handleConfirm} // 確定
        onCancel={hideTimePicker} // キャンセル
      />
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

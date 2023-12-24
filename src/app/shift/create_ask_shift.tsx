// React
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
// EXPO
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
// FireStore
import { collection, addDoc } from 'firebase/firestore'
import { db, auth } from '../../config'
// 独自コンポーネント
import CircleButton from '../../components/CircleButton'
import { type inArrayMap } from '../types/in-array-map'

// 募集するシフトを作成する
const CreateAskShift = (): JSX.Element => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Timestamp型に変換する
  // const convertToTimestamp = (date: string): Timestamp => {
  //   const dateObject = new Date(date)
  //   return Timestamp.fromDate(dateObject)
  // }

  // 指定された期間の配列を生成
  const generateDateArray = (start: Date, end: Date): string[] => {
    const dateArray: string[] = [] // 格納用のからの配列
    const currentDate = new Date(start) // Date型 例:'2023-12-1T12:00:00.000Z'
    // 期間分回す
    while (currentDate <= end) {
      // Date型のcurrentDateを'2023-12-1'のString型に整型
      dateArray.push(currentDate.toISOString().split('T')[0])
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dateArray
  }

  // 募集シフトを保存
  const handlePress = (): void => {
    if (auth.currentUser === null) { return }
    // 差分計算のためDate型に変換
    const start = new Date(startDate)
    const end = new Date(endDate)
    // 定義した関数で期間の配列作成
    const dateArray = generateDateArray(start, end)
    // map()でdateArrayの各要素dateに対してkeyがdate,valueがmap型の配列を生成
    // Object.fromEntries()で[key,value]形式の配列を元に新しいオブジェクト(map)を生成
    // const submitted: { [key: string]: inArrayMap} = Object.fromEntries(dateArray.map((date) => [date, {} as inArrayMap]))
    const submitted = Object.fromEntries(dateArray.map((date) => [date, []]))
    // pre-shiftsコレクションへの参照
    const ref = collection(db, 'pre-shifts')
    addDoc(ref, {
      startDate,
      endDate,
      submitted
    })
      .then((docRef) => {
        console.log('success', docRef.id)
        router.back()
      })
      .catch((error) => {
        console.log(error, 'エラー')
      })
  }
  return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>募集期間：</Text>
        <TextInput
            style={styles.input}
            value={startDate}
            onChangeText={(text) => { setStartDate(text) }}
            // autoCapitalize='none'
            // keyboardType='email-address'
            // placeholder='Email Address'
            // textContentType='emailAddress'
          />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>~</Text>
        <TextInput
            style={styles.input}
            value={endDate}
            onChangeText={(text) => { setEndDate(text) }}
            // autoCapitalize='none'
            // keyboardType='email-address'
            // placeholder='Email Address'
            // textContentType='emailAddress'
          />
      </View>
      {/* 店舗作成ボタン */}
      <CircleButton buttonColor='#22ff22' textColor='white'
      onPress={() => {
        handlePress(

        )
      } }>
        <MaterialIcons name='done-all' size={40} />
      </CircleButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  text: {
    fontSize: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  input: {
    width: 200,
    borderWidth: 2,
    borderColor: '#0000ff',
    borderRadius: 5,
    padding: 6
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 24
  }
})

export default CreateAskShift

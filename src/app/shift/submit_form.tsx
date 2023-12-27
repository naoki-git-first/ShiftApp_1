import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native'

// import SquareButton from '../../components/SquareButton'
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import { type Pre } from '../types/pre-shift'
import { auth, db } from '../../config'
import { Timestamp, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import WriteShiftList from '../../components/WriteShiftList'
import { type inArrayMap } from '../types/in-array-map'
import { useLocalSearchParams } from 'expo-router'
import SelectWorkTime from '../../components/SelectWorkTime'

// const temp = (): void => {
//   Alert.alert('一時保存！')
// }

// const submit = (): void => {
//   Alert.alert('提出！')
// }

// const disMissKeyBoard = (): void => {
//   Keyboard.dismiss()
// }

const SubmitForm = (): JSX.Element => {
  const [pres, setPres] = useState<Pre>()
  // const [submittedLists, setSubmittedLists] = useState<string[]>([])
  const [submittedDates, setSubmittedDates] = useState<string[]>([])
  // 追加
  const [selectedTimes, setSelectedTimes] = useState<{ date: string; start: Date; end: Date }[]>([])

  const id = String(useLocalSearchParams().id)
  useEffect(() => {
    if (auth.currentUser === null) { return }
    // pre-shiftコレクションへの参照
    // 取得したドキュメントidへの参照
    const remoteSubmittedLists: string[] = []
    const documentid = 'Lky2ri2fCHrLF675dBIN'
    const ref = doc(db, 'pre-shifts', id)
    const unsubscribe = onSnapshot(ref, (preDoc) => {
      if (preDoc.exists()) {
        const {
          startDate,
          endDate,
          submitted
        } = preDoc.data() as Pre
        setPres({
          id: preDoc.id,
          startDate,
          endDate,
          submitted
        })
        const dates = Object.keys(submitted).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        setSubmittedDates(dates)
      }
    })
    return unsubscribe
  }, [])

  // Timestamp型に変換する
  const convertToTimestamp = (date: string): Timestamp => {
    const dateObject = new Date(date)
    return Timestamp.fromDate(dateObject)
  }

  const UpdateDoc = (date: string, shiftData: inArrayMap): void => {
    const ref = doc(db, 'pre-shifts', id)
    updateDoc(ref, {
      [`submitted.${date}`]: arrayUnion(shiftData)
    })
      .then(() => {
        console.log('success')
        Alert.alert('できました')
      })
      .catch((error) => {
        console.log(error, 'エラー')
      })
  }

  const handleAddShift = (date: string): void => {
    if (auth.currentUser === null) { return }
    const userID = auth.currentUser.uid
    const start = convertToTimestamp('2023-1-1')
    const end = convertToTimestamp('2023-1-1')
    // 保存するデータ作成
    const newShiftData: inArrayMap = {
      userID,
      start,
      end
    }
    // ドキュメントデータを更新する
    UpdateDoc(date, newShiftData)
  }

  const onSaveSelectedTime = (date: string, start: Date, end: Date): void => {
    // 保存ボタンが押されたことを親コンポーネントに伝える
    setSelectedTimes((prevSelectedTimes) => [
      ...prevSelectedTimes,
      { date, start, end }
    ])
  }

  const saveToFirestore = (): void => {
    if (selectedTimes.length === 0) {
      return // 保存するデータがない場合は何もしない
    }

    // 保存処理を実行
    const ref = doc(db, 'pre-shifts', id)
    const updatedSubmitted: { [key: string]: inArrayMap[] } = {}

    // 日付ごとにデータを集める
    selectedTimes.forEach((selectedTime) => {
      const { date, start, end } = selectedTime
      if (!updatedSubmitted[date]) {
        updatedSubmitted[date] = []
      }
      updatedSubmitted[date].push({ userID: auth.currentUser.uid, start, end })
    })

    // それぞれの日付のデータを Firestore に保存
    Object.entries(updatedSubmitted).forEach(([date, shifts]) => {
      const shiftData = shifts[0] // 今回は一つの要素のみを処理すると仮定
      UpdateDoc(date, shiftData)
    })
  }


  return (
  // <TouchableWithoutFeedback onPress={disMissKeyBoard} style={styles.disMiss}>
      <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={submittedDates}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text style={styles.dateText}>{item}</Text>
            {/* <FlatList
              data={pres?.submitted[item] || []}
              keyExtractor={(shift) => shift.userID} // Assuming each shift has a unique identifier
              renderItem={({ item: shift }) => (
                <WriteShiftList userID={shift.userID} start={shift.start} end={shift.end} />
              )}
            /> */}
            {/* <SelectWorkTime /> */}
            <SelectWorkTime date={item} onAddTime={onSaveSelectedTime} />
            <TouchableOpacity onPress={() => { handleAddShift(item) }}>
              {/* <Text>配列に追加</Text> */}
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(date) => date}
      />
      <TouchableOpacity onPress={saveToFirestore}>
        <Text>firestoreに保存</Text>
      </TouchableOpacity>
      </SafeAreaView>
  // </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  disMiss: {
    flex: 1
  },
  safeArea: {
    flex: 1
  },
  dateText: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center'
  },
  listContainer: {
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 12
  },
  listInnerText: {
    fontSize: 20,
    marginHorizontal: 10
  },
  input: {
    width: 200,
    borderWidth: 2,
    borderColor: '#0000ff',
    borderRadius: 5,
    padding: 6
  }
})

export default SubmitForm

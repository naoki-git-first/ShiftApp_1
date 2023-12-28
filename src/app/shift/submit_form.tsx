// React
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, Keyboard } from 'react-native'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
// EXPO
import { useLocalSearchParams } from 'expo-router'
// Fire Store
import { auth, db } from '../../config'
import { Timestamp, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
// 独自コンポーネント
import { type Pre } from '../types/pre-shift'
import { type inArrayMap } from '../types/in-array-map'
import SelectWorkTime from '../../components/SelectWorkTime'

// import SquareButton from '../../components/SquareButton'
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

// const temp = (): void => {
//   Alert.alert('一時保存！')
// }

// const submit = (): void => {
//   Alert.alert('提出！')
// }

// const disMissKeyBoard = (): void => {
//   Keyboard.dismiss()
// }

// シフト提出画面
const SubmitForm = (): JSX.Element => {
  const [pres, setPres] = useState<Pre>()
  // const [submittedLists, setSubmittedLists] = useState<string[]>([])
  // 日付順に並び替えた配列
  const [submittedDates, setSubmittedDates] = useState<string[]>([])
  const [selectedTimes, setSelectedTimes] = useState<{ date: string; start: Date; end: Date }[]>([])
  const id = String(useLocalSearchParams().id) // ドキュメントid

  useEffect(() => { // 表示データ取得
    if (auth.currentUser === null) { return }
    const remoteSubmittedLists: string[] = []
    // pre-shiftコレクションの取得したドキュメントidへの参照
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
        // submittedのキーを日付順に並び替える
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

  // const handleAddShift = (date: string): void => {
  //   if (auth.currentUser === null) { return }
  //   const userID = auth.currentUser.uid
  //   const start = convertToTimestamp('2023-1-1')
  //   const end = convertToTimestamp('2023-1-1')
  //   // 保存するデータ作成
  //   const newShiftData: inArrayMap = {
  //     userID,
  //     start,
  //     end
  //   }
  //   // ドキュメントデータを更新する
  //   UpdateDoc(date, newShiftData)
  // }

  const onSaveSelectedTime = (date: string, start: Date, end: Date): void => {
    setSelectedTimes((prevSelectedTimes) => [
      ...prevSelectedTimes, // これまでの配列
      { date, start, end } // 新しく配列に追加するオブジェクト
    ])
  }

  const saveToFirestore = (): void => {
    if (selectedTimes.length === 0) {
      return // 保存するデータがない場合は何もしない
    }

    // // 保存処理を実行
    // const ref = doc(db, 'pre-shifts', id)
    // 更新用の配列
    const updatedSubmitted: { [key: string]: inArrayMap[] } = {}

    // 日付ごとにデータを集める
    selectedTimes.forEach((selectedTime) => {
      const { date, start, end } = selectedTime
      if (!updatedSubmitted[date]) { // キー：dateがオブジェクトに存在しなければ作成
        updatedSubmitted[date] = [] // 空の配列をセット
      }
      if (auth.currentUser === null) { return }
      // キーが一致する配列に追加する
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
            {/* <TouchableOpacity onPress={() => { handleAddShift(item) }}>
              {/* <Text>配列に追加</Text> */}
            {/* </TouchableOpacity> */}
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

// React
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
// EXPO
import { useLocalSearchParams } from 'expo-router'
// Fire Store
import { auth, db } from '../../config'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
// 独自コンポーネント
import { type Pre } from '../types/pre-shift'
import { type inArrayMap } from '../types/in-array-map'
import SelectWorkTime from '../../components/SelectWorkTime'

// シフト提出画面
const SubmitForm = (): JSX.Element => {
  const [pres, setPres] = useState<Pre>()
  // 日付順に並び替えた配列
  const [submittedDates, setSubmittedDates] = useState<string[]>([])
  // submittedのデータを保持
  const [submitted, setSubmitted] = useState<Record<string, inArrayMap[]>>({})
  // 新たに追加されるオブジェクト
  const [selectedTimes, setSelectedTimes] = useState<Array<{ date: string, start: Date, end: Date }>>([])

  const id = String(useLocalSearchParams().id) // ドキュメントid

  useEffect(() => { // 表示データ取得
    if (auth.currentUser === null) { return }
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
        setSubmittedDates(dates) // 募集期間
        setSubmitted(submitted) // 既存データ
      }
    })
    return unsubscribe
  }, [])

  // 選択された時間を配列に追加する
  const onSaveSelectedTime = (date: string, start: Date, end: Date): void => {
    if (start === null || end === null) { // オブジェクトが不十分な時
      Alert.alert('時間を指定してください')
      return
    }
    setSelectedTimes((prevSelectedTimes) => [
      ...prevSelectedTimes, // これまで追加した要素
      { date, start, end } // 新しく配列に追加するオブジェクト
    ])
  }

  // 選択された時間を保存する
  const saveToFirestore = (): void => {
    if (selectedTimes.length === 0) {
      return // 追加で保存するデータがない場合は何もしない
    }

    // selectedTimeを元にsubmittedを更新
    const updatedSubmitted: Record<string, inArrayMap[]> = { ...submitted }

    // Object.keys(updatedSubmitted).forEach((date) => {
    //   if (!selectedTimes.some((time) => time.date === date)) {
    //     // selectedTimesに含まれない日付の場合
    //     updatedSubmitted[date] = [...(submitted[date] || [])] // 既存のデータがあればコピー
    //   }
    // })

    // 日付ごとにデータを集める
    selectedTimes.forEach((selectedTime) => {
      const { date, start, end } = selectedTime
      // if (!updatedSubmitted[date]) { // キー：dateがオブジェクトに存在しなければ作成
      //   updatedSubmitted[date] = [...(submitted[date] || [])]
      // }
      if (auth.currentUser === null) { return }
      // キーが一致する配列にselectedTimeから取り出したデータを追加する
      updatedSubmitted[date].push({ userID: auth.currentUser.uid, start, end })
    })
    // setSubmitted(updatedSubmitted)
    UpdateDoc(updatedSubmitted)
  }

  // 更新処理
  const UpdateDoc = (updatedSubmitted: Record<string, inArrayMap[]>): void => {
    const ref = doc(db, 'pre-shifts', id)
    updateDoc(ref, {
      submitted: updatedSubmitted
    })
      .then(() => {
        console.log('success')
        Alert.alert('提出しました')
      })
      .catch((error) => {
        console.log(error, 'エラー')
      })
  }

  return (
  // <TouchableWithoutFeedback onPress={disMissKeyBoard} style={styles.disMiss}>
      <SafeAreaView style={styles.safeArea}>
        <Text>{ pres?.startDate }</Text>
        <FlatList
          data={submittedDates}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <Text style={styles.dateText}>{item}</Text>
              <SelectWorkTime date={item} onAddTime={onSaveSelectedTime} />
            </View>
          )}
          keyExtractor={(date) => date}
        />
        <TouchableOpacity onPress={saveToFirestore}>
          <Text style={styles.storeButton}>シフトを提出する</Text>
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
  },
  storeButton: {
    fontSize: 28,
    alignSelf: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 12
  }
})

export default SubmitForm

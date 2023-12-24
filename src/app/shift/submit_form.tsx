import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native'

// import SquareButton from '../../components/SquareButton'
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import { type Pre } from '../types/pre-shift'
import { auth, db } from '../../config'
import { doc, onSnapshot } from 'firebase/firestore'

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
  const [submittedLists, setSubmittedLists] = useState<string[]>([])
  const [submittedDates, setSubmittedDates] = useState<string[]>([])

  useEffect(() => {
    if (auth.currentUser === null) { return }
    // pre-shiftコレクションへの参照
    const remoteSubmittedLists: string[] = []
    const documentid = 'Lky2ri2fCHrLF675dBIN'
    const ref = doc(db, 'pre-shifts', documentid)
    const unsubscribe = onSnapshot(ref, (preDoc) => {
      if (preDoc.exists()) {
        const {
          startDate,
          endDate,
          submitted
        } = preDoc.data() as Pre
        setPres({
          startDate,
          endDate,
          submitted
        })
                // // submittedの中身を配列に変換
                // const submittedArray = Object.entries(submitted).map(([date, inArrayMap]) => {
                //   return `Date: ${date}, Data: ${JSON.stringify(inArrayMap)}`;
                // })
        // setSubmittedLists(submittedArray)
        const dates = Object.keys(submitted).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        setSubmittedDates(dates);
      }
    })
    return unsubscribe
  }, [])

  return (
  // <TouchableWithoutFeedback onPress={disMissKeyBoard} style={styles.disMiss}>
      <SafeAreaView style={styles.safeArea}>
        <Text>{pres?.startDate}〜{pres?.endDate}</Text>
        {/* {submittedLists.map((item.submitted: any) => (
          <Text key={item.submitted}>{item.submitted}</Text>
        ))} */}
        {/* <View>
  {Object.entries(pres?.submitted).map(([date, inArrayMap]) => (
    <View key={date}>
      <Text>Date: {date}</Text>
      {Object.entries(inArrayMap).map(([key, value]) => (
        <Text key={key}>{key}: {value}</Text>
      ))}
    </View>
  ))}
</View> */}
    {/* submitted のキーを表示 */}
    {/* {pres && Object.keys(pres.submitted).map((date) => (
      <Text key={date}>{date}</Text>
    ))} */}
      {submittedDates.map((date) => (
        <View key={date}>
          <Text>Date: {date}</Text>
          {Object.entries(pres?.submitted[date]).map(([key, value]) => (
            <Text key={key}>{key}: {value}</Text>
          ))}
        </View>
      ))}
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 12
  },
  listInnerText: {
    fontSize: 20,
    marginHorizontal: 10
  },
  inputTime: {
    width: 30,
    height: 30,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#0000ff',
    textAlign: 'center',
    padding: 4,
    margin: 4
  }
})

export default SubmitForm

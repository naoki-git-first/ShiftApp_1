import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native'

// import SquareButton from '../../components/SquareButton'
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import { type Pre } from '../types/pre-shift'
import { auth, db } from '../../config'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import AskShiftList from '../../components/AskShiftList'

const askShift = (): JSX.Element => {
  const [pres, setPres] = useState<Pre>()
  const [submittedDates, setSubmittedDates] = useState<Pre[]>([])

  useEffect(() => {
    if (auth.currentUser === null) { return }
    // const documentid = 'Lky2ri2fCHrLF675dBIN'
    // pre-shiftコレクションへの参照
    const ref = collection(db, 'pre-shifts')
    // 昇順でクエリを発行
    const q = query(ref, orderBy('startDate', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteAskShiftLists: Pre[] = []
      snapshot.forEach((preDoc) => {
        if (preDoc.exists()) {
          const {
            startDate,
            endDate,
            submitted
          } = preDoc.data() as Pre
          remoteAskShiftLists.push({
            startDate,
            endDate,
            submitted
          })
        }
        setSubmittedDates(remoteAskShiftLists)
      })
    })
    return unsubscribe
  }, [])

  return (
  // <TouchableWithoutFeedback onPress={disMissKeyBoard} style={styles.disMiss}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={submittedDates}
          renderItem={({ item }) => <AskShiftList pre={item} />}
          />
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

export default askShift

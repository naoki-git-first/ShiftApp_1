// React
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
// FireStore
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../../config'
// 独自コンポーネント
import ApplicationList from '../../components/ApplicationList'
import { type Application } from '../types/application'
// 承認チェック
const EditApplication = (): JSX.Element => {
  const [applications, setApplications] = useState<Application[]>([])
  useEffect(() => {
    const ref = collection(db, 'applies')
    const q = query(ref, orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteApplication: Application[] = []
      snapshot.forEach((doc) => {
        const { storeID, userID, userName, createdAt } = doc.data()
        remoteApplication.push({
          // id: doc.id,
          storeID,
          userID,
          userName,
          createdAt
        })
      })
      setApplications(remoteApplication)
    })
    return unsubscribe
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.hoge}>承認待ち</Text>
      <FlatList
        data={applications}
        renderItem={({ item }) => <ApplicationList application={item} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  hoge: {
    fontSize: 20,
    alignSelf: 'center'
  }
})

export default EditApplication

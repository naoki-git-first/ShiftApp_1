// React
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
// FireStore
import { collection, onSnapshot, query, orderBy, doc, updateDoc, arrayUnion } from 'firebase/firestore'
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
        const { storeID, storeName, userID, userName, createdAt } = doc.data()
        remoteApplication.push({
          id: doc.id,
          storeID,
          storeName,
          userID,
          userName,
          createdAt
        })
      })
      setApplications(remoteApplication)
    })
    return unsubscribe
  }, [])

  const handleApprove = (storeID: string, userID: string): void => {
    const ref = doc(db, 'users', userID)
    const position = 'アルバイト'
    updateDoc(ref, {
      position,
      storeIDs: arrayUnion(storeID) // 所属店舗に追加
    })
      .then(() => {
        // const remoteStoreIDs = docRef?.data()?.storeIDs
        // setStoreIDs(remoteStoreIDs)
        console.log('success')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.hoge}>承認待ち</Text>
      <FlatList
        data={applications}
        renderItem={({ item }) => (
          <ApplicationList application={item} onApprove={() => { handleApprove(item.storeID, item.userID) }} />
        )}
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

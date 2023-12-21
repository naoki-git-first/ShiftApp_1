import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { type Application } from '../types/application'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../../config'
import { FlatList } from 'react-native-gesture-handler'
import ApplicationList from '../../components/ApplicationList'

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
  }
})

export default EditApplication

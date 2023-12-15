import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { type Application } from '../types/application'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../config'
import { orderBy } from 'lodash'
import { FlatList } from 'react-native-gesture-handler'

const EditApplication = (): JSX.Element => {
  const [applications, setApplications] = useState<Application[]>([])
  useEffect(() => {
    const ref = collection(db, 'applies')
    const q = query(ref, orderBy('updatedAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteApplication: Application[] = []
      snapshot.forEach((doc) => {
        const { storeID, userID, userName } = doc.data()
        remoteApplication.push({
          // id: doc.id,
          storeID,
          userID,
          userName,
          updatedAt
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

import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { getDoc, doc, collection, addDoc } from 'firebase/firestore'
import { router } from 'expo-router'

import { auth, db } from '../../config'
import { type tProfile } from '../types/profile'
import SquareButton from '../../components/SquareButton'

const handleApply = (storeID: string, userID: string, userName: string): void => {
  console.log(storeID, userID)
  const ref = collection(db, 'applies')
  addDoc(ref, {
    storeID,
    userID,
    userName
  })
    .then((docRef) => {
      router.back()
    })
    .catch((error) => {
      console.log(error)
    })
}

const ApplyToJoin = (): JSX.Element => {
  const [storeID, setStoreID] = useState('')
  const [profile, setProfile] = useState<tProfile | null>(null)
  useEffect(() => {
    if (auth.currentUser === null) { return }
    const userID = auth.currentUser.uid
    const ref = doc(db, 'users', userID)
    getDoc(ref)
      .then((docRef) => {
        if (docRef.exists()) {
          const {
            userName,
            mailAddress,
            password,
            position
          } = docRef.data() as tProfile
          setProfile({
            id: docRef.id,
            userName,
            mailAddress,
            password,
            position
          })
        }
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('データの取得に失敗しました')
      })
  }, [])
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.rowContainer}>
        <Text style={styles.userName}>{profile?.userName}</Text>
        <Text style={styles.text}>として店舗に参加申請する</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="店舗のIDを入力してください"
        value={storeID}
        onChangeText={(text) => { setStoreID(text) }}
      />
      <SquareButton text="参加する" buttonColor='#22ddff' textColor='#ffffff'
        onPress={() => { handleApply(storeID, String(profile?.id), String(profile?.userName)) }} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  userName: {
    fontSize: 20,
    color: '#ff0000',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  text: {
    fontSize: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  input: {
    width: 300,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#0000ff',
    borderRadius: 5,
    padding: 6
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 24
  }
})

export default ApplyToJoin

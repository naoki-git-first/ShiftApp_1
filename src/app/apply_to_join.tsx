/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, Alert } from 'react-native'
import { auth, db } from '../config'
import { getDoc, doc } from 'firebase/firestore'
import { type tProfile } from './types/profile'

const handleApply = (storeID: string, userID: string, userName: string): void => {
  console.log(storeID, userID)
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
    <View>
      <Text>店舗に参加申請する</Text>
      <Text>{profile?.userName}</Text>
      <TextInput
        placeholder="店舗のIDを入力してください"
        value={storeID}
        onChangeText={(text) => { setStoreID(text) }}
      />
      <Button title="参加する" onPress={() => { handleApply(storeID, String(profile?.id), String(profile?.userName)) }} />
    </View>
  )
}

export default ApplyToJoin

import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { getDoc, doc, collection, addDoc, Timestamp, where, query, onSnapshot } from 'firebase/firestore'
import { router } from 'expo-router'

import { auth, db } from '../../config'
import { type tProfile } from '../types/profile'
import SquareButton from '../../components/SquareButton'
import { FlatList } from 'react-native-gesture-handler'
import { type Shop } from '../types/shop'

const handleApply = (storeName: string, userID: string, userName: string): void => {
  console.log(storeName, userID)
  const ref = collection(db, 'applies')
  addDoc(ref, {
    storeName,
    userID,
    userName,
    createdAt: Timestamp.fromDate(new Date())
  })
    .then((docRef) => {
      console.log('success', docRef.id)
      router.back()
    })
    .catch((error) => {
      console.log(error)
    })
}

const ApplyToJoin = (): JSX.Element => {
  const [shopName, setShopName] = useState('')
  const [searchResults, setSearchResults] = useState<Shop[]>([])
  const [profile, setProfile] = useState<tProfile | null>(null)

  const [showConfirmation, setShowConfirmation] = useState(false)

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

  const handleSearch = (): any => {
    const ref = collection(db, 'stores')
    const q = query(ref, where('shopName', '>=', shopName), where('shopName', '<=', shopName + '\uf8ff'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteShops: Shop[] = []
      snapshot.forEach((doc) => {
        const { shopName, shopManager, address, businessDay, regularClosingDay, updatedAt } = doc.data()
        remoteShops.push({
          shopName,
          shopManager,
          address,
          businessDay,
          regularClosingDay,
          updatedAt
        })
      })
      setSearchResults(remoteShops)
    })
    return unsubscribe
  }
  // 参加するボタンが押された時の処理
  const handleSave = (): void => {
    // ユーザーに確認を求める
    setShowConfirmation(true)
  }
  // 確認ダイアログで承認された時
  const handleConfirmationOK = (): void => {
    // データを保存する
    handleApply(shopName, String(profile?.id), String(profile?.userName))
    // 確認ダイアログを非表示にする
    setShowConfirmation(false)
  }
  // 確認ダイアログで拒否された時
  const handleConfirmationCancel = (): void => {
    // 確認ダイアログを非表示にする
    setShowConfirmation(false)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.rowContainer}>
        <Text style={styles.userName}>{profile?.userName}</Text>
        <Text style={styles.text}>として店舗に参加申請する</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="店舗名を入力してください"
        value={shopName}
        onChangeText={(text) => { setShopName(text) }}
      />
      <SquareButton
        text="検索する"
        buttonColor="#22ddff"
        textColor="#ffffff"
        onPress={() => {
          handleSearch()
        }}
      />
       <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.shopName}</Text>
            <SquareButton
              text="参加する"
              buttonColor="#22ddff"
              textColor="#ffffff"
              onPress={
                handleSave
              }
            />
          </View>
        )}
      />
      {showConfirmation && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>保存してもよろしいですか？</Text>
          <SquareButton
            text="OK"
            buttonColor="#22ddff"
            textColor="#ffffff"
            onPress={handleConfirmationOK}
          />
          <SquareButton
            text="キャンセル"
            buttonColor="#ff0000"
            textColor="#ffffff"
            onPress={handleConfirmationCancel}
          />
        </View>
      )}

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
  },
  confirmationContainer: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    width: '60%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#0000ff'
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 16
  }
})

export default ApplyToJoin

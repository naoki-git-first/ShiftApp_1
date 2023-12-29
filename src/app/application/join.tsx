// React
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
// EXPO
import { router } from 'expo-router'
// FireStore
import { getDoc, doc, collection, addDoc, Timestamp, where, query, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../../config'
// 独自コンポーネント
import SquareButton from '../../components/SquareButton'
import { type tProfile } from '../types/profile'
import { type Shop } from '../types/shop'

// appliesコレクションに参加申請を保存する
const handleApply = (storeID: string, storeName: string, userID: string, userName: string): void => {
  const ref = collection(db, 'applies')
  addDoc(ref, {
    storeID,
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
// 店舗へ参加申請をする
const ApplyToJoin = (): JSX.Element => {
  const [shopName, setShopName] = useState('') // 店舗情報用
  const [searchResults, setSearchResults] = useState<Shop[]>([]) // 検索結果表示用
  const [profile, setProfile] = useState<tProfile | null>(null) // プロフィール用
  // const [showConfirmation, setShowConfirmation] = useState(false) // 確認ダイアログ用
  // const [selectedShopName, setSelectedShopName] = useState('') // 確認ダイアログの店舗名用
  const [confirmationData, setConfirmationData] = useState<{ show: boolean, storeID: string, shopName: string }>({ show: false, storeID: '', shopName: '' })

  useEffect(() => {
    if (auth.currentUser === null) { return }
    const userID = auth.currentUser.uid
    // CurrentUserのドキュメントへの参照
    const ref = doc(db, 'users', userID)
    getDoc(ref)
      .then((docRef) => {
        if (docRef.exists()) {
          const {
            userName,
            mailAddress,
            password,
            position,
            storeIDs
          } = docRef.data() as tProfile
          setProfile({
            id: docRef.id,
            userName,
            mailAddress,
            password,
            position,
            storeIDs
          })
        }
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('データの取得に失敗しました')
      })
  }, [])

  // 店舗名検索
  const handleSearch = (): any => {
    const ref = collection(db, 'stores')
    const q = query(ref, where('shopName', '>=', shopName), where('shopName', '<=', shopName + '\uf8ff'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteShops: Shop[] = []
      snapshot.forEach((doc) => {
        const { shopName, shopManager, address, businessDay, regularClosingDay, updatedAt } = doc.data()
        remoteShops.push({
          id: doc.id,
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
  const handleSave = (selectedStoreID: string, selectedShopName: string): void => {
    // ユーザーに確認を求める
    setConfirmationData({ show: true, storeID: selectedStoreID, shopName: selectedShopName })
  }
  // 確認ダイアログで承認された時
  const handleConfirmationOK = (): void => {
    // データを保存する
    handleApply(confirmationData.storeID, confirmationData.shopName, String(profile?.id), String(profile?.userName))
    // 確認ダイアログを非表示にする
    setConfirmationData({ show: false, storeID: '', shopName: '' })
  }
  // 確認ダイアログで拒否された時
  const handleConfirmationCancel = (): void => {
    // 確認ダイアログを非表示にする
    setConfirmationData({ show: false, storeID: '', shopName: '' })
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
              onPress={() => {
                handleSave(item.id, item.shopName)
              }
              }
            />
          </View>
        )}
      />
      {/* 確認ダイアログ */}
      {confirmationData.show && (
        <View style={styles.confirmationContainer}>
          <Text>{confirmationData.shopName}</Text>
          <Text style={styles.confirmationText}>参加申請してもよろしいですか？</Text>
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

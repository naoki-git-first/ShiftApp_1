// React
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
// EXPO
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
// FireStore
import { collection, addDoc, Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../config'
// 独自コンポーネント
import CircleButton from '../../components/CircleButton'

// 店舗保存処理
const handlePress = (
  shopName: string,
  shopManager: string,
  address: string,
  businessDay: string,
  regularClosingDay: string
): void => {
  if (auth.currentUser === null) { return }
  // storesコレクションへの参照
  const storeRef = collection(db, 'stores')
  // 新しい店舗ドキュメントを追加
  addDoc(storeRef, {
    shopName,
    shopManager,
    address,
    businessDay,
    regularClosingDay,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then((newStoreDocRef) => {
      // 新しい店舗ドキュメントのIDを取得
      const newStoreDocId = newStoreDocRef.id
      console.log(newStoreDocRef.id)

      // 現在のユーザーのドキュメント参照を取得
      if (auth.currentUser === null) { return }
      const userId = auth.currentUser.uid
      const userRef = doc(db, 'users', userId)
      // ユーザーのstoreIDsを更新
      getDoc(userRef)
        .then((userDoc) => {
          if (userDoc.exists()) {
            const currentStoreIDs = userDoc.data()?.storeIDs
            const updatedStoreIDs = [...currentStoreIDs, newStoreDocId]

            // storeIDsを更新
            updateDoc(userRef, {
              storeIDs: updatedStoreIDs
            })
              .then(() => {
                console.log('success')
                router.back()
              })
              .catch((error: any) => {
                console.error(error, 'エラー')
              })
          }
        })
        .catch((error) => {
          console.error(error, 'エラー')
        })
    })
    .catch((error) => {
      console.log(error, 'エラー')
    })
}
// 管理する店舗作成
const CreateShop = (): JSX.Element => {
  const [shopName, setShopName] = useState('')
  const [shopManager, setShopManager] = useState('')
  const [address, setAddress] = useState('')
  const [businessDay, setBusinessDay] = useState('')
  const [regularClosingDay, setRegularClosingDay] = useState('')

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>店舗名：</Text>
        <TextInput
            style={styles.input}
            value={shopName}
            onChangeText={(text) => { setShopName(text) }}
            // autoCapitalize='none'
            // keyboardType='email-address'
            // placeholder='Email Address'
            // textContentType='emailAddress'
          />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>店長：</Text>
        <TextInput
            style={styles.input}
            value={shopManager}
            onChangeText={(text) => { setShopManager(text) }}
            // autoCapitalize='none'
            // keyboardType='email-address'
            // placeholder='Email Address'
            // textContentType='emailAddress'
          />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>住所：</Text>
        <TextInput
            style={styles.input}
            value={address}
            onChangeText={(text) => { setAddress(text) }}
            // autoCapitalize='none'
            // keyboardType='email-address'
            // placeholder='Email Address'
            // textContentType='emailAddress'
          />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>営業日：</Text>
        <TextInput
            style={styles.input}
            value={businessDay}
            onChangeText={(text) => { setBusinessDay(text) }}
            // autoCapitalize='none'
            // keyboardType='email-address'
            // placeholder='Email Address'
            // textContentType='emailAddress'
          />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>定休日：</Text>
        <TextInput
            style={styles.input}
            value={regularClosingDay}
            onChangeText={(text) => { setRegularClosingDay(text) }}
            // autoCapitalize='none'
            // keyboardType='email-address'
            // placeholder='Email Address'
            // textContentType='emailAddress'
          />
      </View>
      {/* 店舗作成ボタン */}
      <CircleButton buttonColor='#22ff22' textColor='white'
      onPress={() => {
        handlePress(
          shopName,
          shopManager,
          address,
          businessDay,
          regularClosingDay
        )
      } }>
        <MaterialIcons name='done-all' size={40} />
      </CircleButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  text: {
    fontSize: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  input: {
    width: 200,
    borderWidth: 2,
    borderColor: '#0000ff',
    borderRadius: 5,
    padding: 6
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 24
  }
})

export default CreateShop

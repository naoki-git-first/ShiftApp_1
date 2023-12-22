// React
import { View, Text, SafeAreaView, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
// EXPO
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
// FireStore
import { Timestamp, setDoc, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../config'
// 独自コンポーネント
import CircleButton from '../../components/CircleButton'

// プロフィールの変更保存処理
const profileEdit = (
  userName: string,
  mailAddress: string,
  password: string,
  position: string
): void => {
  if (auth.currentUser === null) { return }
  const userId = auth.currentUser.uid
  // CurrentUserのドキュメント参照
  const ref = doc(db, 'users', userId)
  setDoc(ref, {
    userName,
    mailAddress,
    password,
    position,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then((docRef) => {
      router.back()
    })
    .catch((error) => {
      console.log(error)
      Alert.alert('更新に失敗しました')
    })
}
// プロフィール編集
const Profile = (): JSX.Element => {
  const [userName, setUserName] = useState('')
  const [mailAddress, setMailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [position, setPosition] = useState('')

  const disMissKeyBoard = (): void => {
    Keyboard.dismiss()
  }

  useEffect(() => {
    if (auth.currentUser === null) { return }
    const userId = auth.currentUser.uid
    const ref = doc(db, 'users', userId)
    getDoc(ref)
      .then((docRef) => {
        const RemoteUserName = docRef?.data()?.userName
        const RemoteMailAddress = docRef?.data()?.mailAddress
        const RemotePassword = docRef?.data()?.password
        const RemotePosition = docRef?.data()?.position
        setUserName(RemoteUserName)
        setMailAddress(RemoteMailAddress)
        setPassword(RemotePassword)
        setPosition(RemotePosition)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <TouchableWithoutFeedback onPress={disMissKeyBoard}>
      <SafeAreaView style={styles.safeArea}>

      <View>
        <Text style={styles.shopNameText}>店名</Text>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.icon}>
          <Text>画</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.baseText}>名前： </Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={(text) => { setUserName(text) }}
            // autoCapitalize='none'
            // keyboardType='email-address'
            // placeholder='Email Address'
            // textContentType='emailAddress'
          />
        </View>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.baseText}>役職：</Text>
        <TextInput
          style={styles.input}
          value={position}
          onChangeText={(text) => { setPosition(text) }}
          // autoCapitalize='none'
          // keyboardType='email-address'
          // placeholder='Email Address'
          // textContentType='emailAddress'
        />
      </View>
      <View>
        <Text style={styles.baseText}>店舗：</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.baseText}>メールアドレス：</Text>
        <TextInput
          style={styles.input}
          value={mailAddress}
          onChangeText={(text) => { setMailAddress(text) }}
          // autoCapitalize='none'
          // keyboardType='email-address'
          // placeholder='Email Address'
          // textContentType='emailAddress'
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.baseText}>パスワード：</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text) }}
          // autoCapitalize='none'
          secureTextEntry
          // placeholder='Email Address'
          textContentType='password'
        />
      </View>
      {/* 編集ボタン */}
      <CircleButton buttonColor='#22ff22' textColor='white'
      onPress={() => {
        profileEdit(
          userName,
          mailAddress,
          password,
          position
        )
      }}>
        <MaterialIcons name='done-all' size={40} />
      </CircleButton>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  shopNameText: {
    fontSize: 32,
    backgroundColor: '#ffffff',
    paddingTop: 12,
    paddingHorizontal: 12,
    textAlign: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  icon: {
    width: 64,
    height: 64,
    backgroundColor: '#dddddd',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
    marginHorizontal: 12
  },
  input: {
    width: 200,
    borderWidth: 2,
    borderColor: '#0000ff',
    borderRadius: 5,
    padding: 6
  },
  baseText: {
    fontSize: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  }
})

export default Profile

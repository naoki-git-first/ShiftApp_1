import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

import CircleButton from '../../components/CircleButton'
import { TextInput } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../config'

const handlePress = (
  id: string,
  shopName: string,
  shopManager: string,
  address: string,
  businessDay: string,
  regularClosingDay: string
): void => {
  if (auth.currentUser === null) { return }
  const ref = doc(db, 'stores', id)
  setDoc(ref, {
    shopName,
    shopManager,
    address,
    businessDay,
    regularClosingDay
  })
    .then((docRef) => {
      router.back()
    })
    .catch((error) => {
      console.log(error)
      Alert.alert('更新に失敗しました')
    })
}

const EditShop = (): JSX.Element => {
  const id = String(useLocalSearchParams().id)

  const [shopName, setShopName] = useState('')
  const [shopManager, setShopManager] = useState('')
  const [address, setAddress] = useState('')
  const [businessDay, setBusinessDay] = useState('')
  const [regularClosingDay, setRegularClosingDay] = useState('')

  useEffect(() => {
    if (auth.currentUser === null) { return }
    // const userId = auth.currentUser.uid
    const ref = doc(db, 'stores', id)
    getDoc(ref)
      .then((docRef) => {
        const RemoteShopName = docRef?.data()?.shopName
        const RemoteShopManager = docRef?.data()?.shopManager
        const RemoteAddress = docRef?.data()?.Address
        const RemoteBusinessDay = docRef?.data()?.businessDay
        const RemoteRegularClosingDay = docRef?.data()?.regularClosingDay
        setShopName(RemoteShopName)
        setShopManager(RemoteShopManager)
        setAddress(RemoteAddress)
        setBusinessDay(RemoteBusinessDay)
        setRegularClosingDay(RemoteRegularClosingDay)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
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
      <CircleButton buttonColor='#22ff22' textColor='white'
      onPress={() => {
        handlePress(
          id,
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

export default EditShop

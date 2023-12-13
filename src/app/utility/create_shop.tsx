import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

import CircleButton from '../../components/CircleButton'

import { db, auth } from '../../config'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

const handlePress = (
  shopName: string,
  shopManager: string,
  address: string,
  businessDay: string,
  regularClosingDay: string
): void => {
  console.log(address)

  if (auth.currentUser === null) { return }
  console.log(shopName)

  const ref = collection(db, `users/${auth.currentUser.uid}/shops`)
  console.log(shopManager)
  addDoc(ref, {
    shopName,
    shopManager,
    address,
    businessDay,
    regularClosingDay,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then((docRef) => {
      console.log('success', docRef.id)
      router.replace('utility/shop_info')
    })
    .catch((error) => {
      console.log(error, 'エラー')
    })
}

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

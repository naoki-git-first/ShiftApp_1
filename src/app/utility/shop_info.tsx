import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

import CircleButton from '../../components/CircleButton'
import { useEffect, useState } from 'react'
import { type Shop } from '../types/shop'
import { auth, db } from '../../config'
import { doc, onSnapshot } from 'firebase/firestore'

const handlePress = (): void => {
  router.push('utility/edit_shop')
}

const ShopInfo = (): JSX.Element => {
  const id = String(useLocalSearchParams().id)
  const [shop, setShop] = useState<Shop | null>(null)
  useEffect(() => {
    if (auth.currentUser === null) { return }
    const ref = doc(db, `users/${auth.currentUser.uid}/shops`, id)
    const unsubscribe = onSnapshot(ref, (shopDoc) => {
      const {
        shopName,
        shopManager,
        address,
        businessDay,
        regularClosingDay,
        updatedAt
      } = shopDoc.data() as Shop
      setShop({
        id: shopDoc.id,
        shopName,
        shopManager,
        address,
        businessDay,
        regularClosingDay,
        updatedAt
      })
    })
    return unsubscribe
  }, [])
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text style={styles.text}>店舗名：{shop?.shopName}</Text>
      </View>
      <View>
        <Text style={styles.text}>店長：{shop?.shopManager}</Text>
      </View>
      <View>
        <Text style={styles.text}>住所：{shop?.address}</Text>
      </View>
      <View>
        <Text style={styles.text}>営業日：{shop?.businessDay}</Text>
      </View>
      <View>
        <Text style={styles.text}>定休日：{shop?.regularClosingDay}</Text>
      </View>
      <CircleButton buttonColor='#22ff22' textColor='white' onPress={handlePress}>
        <MaterialIcons name='edit' size={40} />
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
  }
})

export default ShopInfo

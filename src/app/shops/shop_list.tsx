import { router } from 'expo-router'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import CircleButton from '../../components/CircleButton'
import ShopList from '../../components/ShopList'
import { db, auth } from '../../config'
import { type Shop } from '../types/shop'
import { FlatList } from 'react-native-gesture-handler'

// const handlePress = (): void => {
//   router.push('utility/shop_info')
// }
const create = (): void => {
  router.push('shops/create_shop')
}

const ManageShop = (): JSX.Element => {
  const [shops, setShops] = useState<Shop[]>([])
  useEffect(() => {
    if (auth.currentUser === null) { return }
    const ref = collection(db, 'stores')
    const q = query(ref, orderBy('updatedAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // if (snapshot.exists()) {
      const remoteShops: Shop[] = []
      snapshot.forEach((doc) => {
        const { shopName, shopManager, address, businessDay, regularClosingDay, updatedAt } = doc.data()
        console.log(shopName)
        remoteShops.push({
          shopName,
          shopManager,
          address,
          businessDay,
          regularClosingDay,
          updatedAt
        })
      })
      // }
      setShops(remoteShops)
    })
    return unsubscribe
  }, [])
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={shops}
        renderItem={({ item }) => <ShopList shop={item} />}
      />
      <CircleButton buttonColor='#22ff22' textColor='white' onPress={create} >
        <Feather name='plus' size={40} />
      </CircleButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  shopList: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 12
  },
  nameText: {
    flex: 1,
    fontSize: 32,
    textAlign: 'center'
  }
})

export default ManageShop

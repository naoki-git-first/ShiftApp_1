// React
import { SafeAreaView, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
// EXPO
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'
// FireStore
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db, auth } from '../../config'
// 独自コンポーネント
import CircleButton from '../../components/CircleButton'
import ShopList from '../../components/ShopList'
import { type Shop } from '../types/shop'

// const handlePress = (): void => {
//   router.push('utility/shop_info')
// }
// 管理店舗作成画面へ
const create = (): void => {
  router.push('shops/create_shop')
}

// 管理店舗のリスト
const ManageShop = (): JSX.Element => {
  const [shops, setShops] = useState<Shop[]>([])
  useEffect(() => {
    if (auth.currentUser === null) { return }
    // storesコレクションへの参照
    const ref = collection(db, 'stores')
    // 降順でクエリを発行
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

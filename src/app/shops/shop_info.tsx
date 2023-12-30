// React
import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
// EXPO
import { router, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
// FireStore
import { auth, db } from '../../config'
import { doc, onSnapshot } from 'firebase/firestore'
// 独自コンポーネント
import { type Shop } from '../types/shop'
import CircleButton from '../../components/CircleButton'

// 店舗詳細情報編集への遷移処理
const handlePress = (id: string): void => {
  router.push({ pathname: 'shops/edit_shop', params: { id } })
}
// 店舗情報詳細
const ShopInfo = (): JSX.Element => {
  // 店舗のidを取得する
  const id = String(useLocalSearchParams().id)
  const [shop, setShop] = useState<Shop | null>(null)
  useEffect(() => {
    if (auth.currentUser === null) { return }
    // 取得したドキュメントidへの参照
    const ref = doc(db, 'stores', id)
    const unsubscribe = onSnapshot(ref, (shopDoc) => {
      const {
        shopName,
        shopManager,
        address,
        businessDay,
        regularClosingDay,
        member,
        updatedAt
      } = shopDoc.data() as Shop
      setShop({
        id: shopDoc.id,
        shopName,
        shopManager,
        address,
        businessDay,
        regularClosingDay,
        member,
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
      {/* 編集ボタン */}
      <CircleButton buttonColor='#22ff22' textColor='white' onPress={() => { handlePress(id) }}>
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

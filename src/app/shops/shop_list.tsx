// React
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
// EXPO
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'
// FireStore
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../config'
// 独自コンポーネント
import CircleButton from '../../components/CircleButton'
import ShopList from '../../components/ShopList'

// 管理店舗作成画面へ
const create = (): void => {
  router.push('shops/create_shop')
}

// 管理店舗のリスト
const ManageShop = (): JSX.Element => {
  // const [shops, setShops] = useState<Shop[]>([])
  const [userStores, setUserStores] = useState([])

  useEffect(() => {
    if (auth.currentUser === null) { return }
    const userID = auth.currentUser.uid
    const userRef = doc(db, 'users', userID)
    getDoc(userRef)
      .then((userDoc) => {
        if (userDoc.exists()) {
          const storeIDs = userDoc.data()?.storeIDs

          // 各店舗IDに対応する店舗情報を取得
          const storePromises = storeIDs.map(async (storeID: string) => {
            const storeDocRef = doc(db, 'stores', storeID)

            return await getDoc(storeDocRef)
              .then((storeDoc) => {
                if (storeDoc.exists()) {
                  return { id: storeDoc.id, ...storeDoc.data() }
                }
                return null
              })
              .catch((error) => {
                console.log(error)
                return null
              })
          })

          // Promise.allで全ての店舗情報を取得できたら実行する
          Promise.all(storePromises)
            .then((stores) => {
              // storesには店舗情報が格納される
              setUserStores(stores.filter((store) => store != null))
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>所属・管理店舗一覧</Text>
      <FlatList
          data={userStores}
          // keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ShopList shop={item} />
          )}
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
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    paddingVertical: 12,
    backgroundColor: '#ffff00'
  }
})

export default ManageShop

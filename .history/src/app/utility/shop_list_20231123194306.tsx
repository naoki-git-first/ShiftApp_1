import { router } from 'expo-router'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import CircleButton from '../../components/CircleButton'
import ShopList from '../../components/ShopList'

const handlePress = (): void => {
  router.push('utility/shop_info')
}
const create = (): void => {
  router.push('utility/create_shop')
}

const ManageShop = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.shopList} onPress={handlePress}>
          <Text style={styles.nameText}>店舗名</Text>
      </TouchableOpacity>
      <ShopList text='梅田店' onPress={handlePress} />
      <CircleButton buttonColor='#22ff22' textColor='white'>
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

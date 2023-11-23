import { router } from 'expo-router'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native'

const handlePress = (): void => {
  router.push('shift/edit')
}

const ShopList = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList />
      <TouchableOpacity style={styles.shopList} onPress={handlePress}>
          <Text style={styles.nameText}>店舗名</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  shopList: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  nameText: {
    flex: 1,
    fontSize: 32,
    textAlign: 'center'
  }
})

export default ShopList

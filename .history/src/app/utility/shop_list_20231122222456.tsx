import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'

const ShopList = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.shopList}>
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
    fontSize: 32,
    textAlign: 'center'
  }
})

export default ShopList

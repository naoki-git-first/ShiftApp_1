import { Text, View, SafeAreaView, StyleSheet } from 'react-native'

const ShopList = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.shopList}>
        <View style={styles.icon}>
          <Text >画</Text>
        </View>
        <View>
          <Text style={styles.nameText}>店舗名</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  shopList: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#dddddd'
  },
  nameText: {
    fontSize: 20
  }
})

export default ShopList

import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'

const ShopList = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.shopList}>
        <View>
          <Text style={styles.nameText}>店舗名</Text>
          <Text style={styles.title}>店舗名</Text>
        </View>
      </TouchableOpacity>
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
    borderColor: '#dddddd',
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  nameText: {
    fontSize: 32,
    textAlign: 'center'
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12
  },
})

export default ShopList

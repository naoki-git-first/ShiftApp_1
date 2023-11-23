import { router } from 'expo-router'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import List from '../../components/List'

const handlePress = (): void => {
  router.push('utility/member_list')
}

const MemberShopList = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <List text='梅田店' onPress={handlePress} />
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

export default MemberShopList

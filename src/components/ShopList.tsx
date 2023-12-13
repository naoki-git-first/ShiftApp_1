import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { type Shop } from '../app/types/shop'

import { Link } from 'expo-router'

interface Props {
  onPress?: () => void
  shop: Shop
}

const List = (props: Props): JSX.Element | null => {
  const { shop, onPress } = props
  const { shopName } = shop
  if (shopName === null) { return null }
  return (
    <Link
    href={{ pathname: 'utility/shop_info', params: { id: shop.id } }}
    asChild
  >
      <TouchableOpacity style={styles.listContainer} onPress={onPress}>
        <Text style={styles.text}>{shopName}店</Text>
      </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    textAlign: 'center'
  },
  listContainer: {
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 12
  }
})

export default List

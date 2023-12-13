import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { type Shop } from '../app/types/shop'

import { auth, db } from '../config'

interface Props {
  onPress?: () => void
  shop: Shop
}

const List = (props: Props): JSX.Element | null => {
  const { shop, onPress } = props
  const { shopName } = shop
  if (shopName === null) { return null }
  return (
    <TouchableOpacity style={styles.listContainer} onPress={onPress}>
      <Text style={styles.text}>{shopName}</Text>
    </TouchableOpacity>
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

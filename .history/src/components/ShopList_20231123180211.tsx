import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const ShopList = (): JSX.Element => {
  return (
    <TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32
  }
})

export default ShopList

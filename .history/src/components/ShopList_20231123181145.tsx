import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  text: string
}

const ShopList = (props: Props): JSX.Element => {
  const { text } = props
  return (
    <TouchableOpacity style={styles.listContainer}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32
  },
  listContainer: {
    flex: 1,
    textAlign: 'center'
  }
})

export default ShopList

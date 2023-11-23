import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  handlePress: () => void
  text: string
}

const ShopList = (props: Props): JSX.Element => {
  const { text, handlePress } = props
  return (
    <TouchableOpacity style={styles.listContainer} onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  listContainer: {
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 12
  }
})

export default ShopList

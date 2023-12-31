import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  onPress?: () => void
  text: string
}

const List = (props: Props): JSX.Element => {
  const { text, onPress } = props
  return (
    <TouchableOpacity style={styles.listContainer} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
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

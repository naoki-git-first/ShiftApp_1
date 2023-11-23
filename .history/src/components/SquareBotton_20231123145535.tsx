import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  children: string
}

const SquareButton = (props: Props): JSX.Element => {
  const children = props.children
  return (
    <TouchableOpacity style={styles.Button}>
      <Text>button</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#ff2299',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 12,
    marginHorizontal: 8
  }
})

export default SquareButton

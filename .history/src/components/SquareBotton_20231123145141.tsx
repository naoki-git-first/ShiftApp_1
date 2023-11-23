import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const SquareBotton = (): JSX.Element => {
  return (
    <TouchableOpacity>
      <Text>botton</Text>
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

export default SquareBotton

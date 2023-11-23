import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  children: string
  buttonColor: string
  text: string
  textColor: string
}

const SquareButton = (props: Props): JSX.Element => {
  const { children, buttonColor, textColor } = props
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]}>
      <Text style={{ color: textColor }}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#dddddd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 12,
    marginHorizontal: 8
  }
})

export default SquareButton

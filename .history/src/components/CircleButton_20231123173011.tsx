import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  buttonColor: string
  text: string
  textColor: string
}

const CircleButton = (props: Props): JSX.Element => {
  const { text, buttonColor, textColor } = props
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]}>
      <Text style={ color: textColor }>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    borderRadius: 40
  }
})

export default CircleButton

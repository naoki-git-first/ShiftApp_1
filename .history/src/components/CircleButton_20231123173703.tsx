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
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    bottom: 40
  },
  buttonText: {
    fontSize: 40,
  }
})

export default CircleButton

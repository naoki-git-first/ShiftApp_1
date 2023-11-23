import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  buttonColor: string
  children: JSX.Element
  textColor: string
}

const CircleButton = (props: Props): JSX.Element => {
  const { children, buttonColor, textColor } = props
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]}>
      <Text style={[styles.buttonText, { color: textColor }]}>{children}</Text>
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
    bottom: 40,
    // ios用
    shadowColor: '#000000',
    shadowOpacity: 0.45,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 8 },
    // andoid用
    elevation: 8
  },
  buttonText: {
    fontSize: 40
  }
})

export default CircleButton

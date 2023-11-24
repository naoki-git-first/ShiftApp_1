import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  onPress: () => void
}

const LogOutButton = (props: Props): JSX.Element => {
  const { onPress } = props
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>ログアウト</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
})

export default LogOutButton

import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { signOut } from 'firebase/auth'
import { router } from 'expo-router'

import { auth } from '../config'

const onPress = (): void => {
  signOut(auth)
    .then(() => {
      router.replace('/auth/log_in')
    })
    .catch(() => {
      Alert.alert('ログアウトに失敗しました')
    })
}

const LogOutButton = (): JSX.Element => {
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

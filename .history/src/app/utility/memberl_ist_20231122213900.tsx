import { Text, View, SafeAreaView, StyleSheet } from 'react-native'

const MemberList = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}></SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  }
})

export default MemberList

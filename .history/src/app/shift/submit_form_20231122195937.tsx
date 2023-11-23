import { SafeAreaView, View, Text, StyleSheet } from 'react-native'

const SubmitForm = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>一時保存</Text>
        <Text>提出</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#808080'
  }
})

export default SubmitForm

import { SafeAreaView, View, Text, StyleSheet } from 'react-native'

const SubmitForm = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>一時保存</Text>
        <Text style={styles.button}>提出</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 18
  },
  button: {
    backgroundColor: '#2299ff',
    paddingVertical: 4,
    paddingHorizontal: 4
  }
})

export default SubmitForm
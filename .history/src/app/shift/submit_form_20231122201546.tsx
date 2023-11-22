import { SafeAreaView, View, Text, StyleSheet } from 'react-native'

const SubmitForm = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.buttonContainer}>
        <Text style={styles.tempSaveButton}>一時保存</Text>
        <Text style={styles.submitButton}>提出</Text>
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
  },
  tempSaveButton: {
    alignItems: 'flex-end'
    backgroundColor: '#2299ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 12,
    marginHorizontal: 8
  },
  submitButton: {
    backgroundColor: '#ff2299',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 12,
    marginHorizontal: 8
  }
})

export default SubmitForm

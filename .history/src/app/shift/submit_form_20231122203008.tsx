import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const SubmitForm = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity>
          <Text style={styles.tempSaveButton}>一時保存</Text>
            </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.submitButton}>提出</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  tempSaveButton: {
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

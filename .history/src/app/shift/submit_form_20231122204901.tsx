import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

const SubmitForm = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text >1/1</Text>
          <TextInput style={styles.inputTime}/>
          <Text>:</Text>
          <TextInput style={styles.inputTime}/>
          <Text>1/1</Text>
          <TextInput style={styles.inputTime}/>
          <Text>:</Text>
          <TextInput style={styles.inputTime}/>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputTime: {
    borderWidth: 1,
    borderColor: '#0000ff',
    paddingVertical: 10,
    paddingHorizontal: 4,
    margin: 4
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

import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

const SubmitForm = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.rowContainer}>
          <Text>1/1</Text>
          <TextInput style={styles.inputDate}/>
          <Text>:</Text>
          <TextInput style={styles.inputDate}/>
          <Text>1/1</Text>
          <TextInput style={styles.inputDate}/>
          <Text>:</Text>
          <TextInput style={styles.inputDate}/>
        </TouchableOpacity>
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
    flexDirection: 'row'
  },
  inputDate: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#0000ff',
    padding: 8,
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

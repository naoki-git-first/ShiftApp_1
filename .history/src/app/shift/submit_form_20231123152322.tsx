import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import SquareButton from '../../components/SquareButton'

const SubmitForm = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <Text style={styles.listInnerText}>1/1</Text>
          <TextInput style={styles.inputTime}/>
          <Text style={styles.listInnerText}>:</Text>
          <TextInput style={styles.inputTime}/>
          <Text style={styles.listInnerText}>~</Text>
          <TextInput style={styles.inputTime}/>
          <Text style={styles.listInnerText}>:</Text>
          <TextInput style={styles.inputTime}/>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity>
          <Text style={styles.tempSaveButton}>一時保存</Text>
            </TouchableOpacity>
<SquareButton text='提出' buttonColor='#ff2299'></SquareButton>
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
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 12
  },
  listInnerText: {
    fontSize: 20,
    marginHorizontal: 10
  },
  inputTime: {
    width: 30,
    height: 30,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#0000ff',
    textAlign: 'center',
    padding: 4,
    margin: 4
  },
  tempSaveButton: {
    backgroundColor: '#2299ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 12,
    marginHorizontal: 8
  },
})

export default SubmitForm

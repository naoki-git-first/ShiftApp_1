import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native'

import SquareButton from '../../components/SquareButton'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const temp = (): void => {
  Alert.alert('一時保存！')
}

const submit = (): void => {
  Alert.alert('提出！')
}

const disMissKeyBoard = (): void => {
  Keyboard.dismiss()
}

const SubmitForm = (): JSX.Element => {
  return (
    // <TouchableWithoutFeedback onPress={disMissKeyBoard} style={styles.disMiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <Text style={styles.listInnerText}>1/1</Text>
            <TextInput
              style={styles.inputTime}
              value={hour}
              onChangeText={(text) => { setHour(text) }}
              // autoCapitalize='none'
              // keyboardType='email-address'
              // placeholder='Email Address'
              // textContentType='emailAddress'
            />
            <Text style={styles.listInnerText}>:</Text>
            <TextInput
              style={styles.inputTime}
              value={hour}
              onChangeText={(text) => { setHour(text) }}
              // autoCapitalize='none'
              // keyboardType='email-address'
              // placeholder='Email Address'
              // textContentType='emailAddress'
            />
            <Text style={styles.listInnerText}>~</Text>
            <TextInput
              style={styles.inputTime}
              value={hour}
              onChangeText={(text) => { setHour(text) }}
              // autoCapitalize='none'
              // keyboardType='email-address'
              // placeholder='Email Address'
              // textContentType='emailAddress'
            />
            <Text style={styles.listInnerText}>:</Text>
            <TextInput
              style={styles.inputTime}
              value={hour}
              onChangeText={(text) => { setHour(text) }}
              // autoCapitalize='none'
              // keyboardType='email-address'
              // placeholder='Email Address'
              // textContentType='emailAddress'
            />
          </View>
          <View style={styles.rowContainer}>
            <SquareButton text='一時保存' buttonColor='#2299ff' textColor='white' onPress={temp} />
            <SquareButton text='提出' buttonColor='#ff2299' textColor='white' onPress={submit} />
          </View>
        </View>
      </SafeAreaView>
    // </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  disMiss: {
    flex: 1
  },
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
  }
})

export default SubmitForm

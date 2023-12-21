import { SafeAreaView, View, Text, StyleSheet, TextInput, Alert, Keyboard } from 'react-native'

interface Props {
  startHour: string
  startMinute: string
  endHour: string
  endMinute: string
  o: (text: string) => void
}

const WorkHour = (props: Props): JSX.Element => {
  const { startHour, startMinute, endHour, endMinute, onChangeText } = props
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listInnerText}>1/1</Text>
      <TextInput
        style={styles.inputTime}
        value={starthour}
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

export default WorkHour

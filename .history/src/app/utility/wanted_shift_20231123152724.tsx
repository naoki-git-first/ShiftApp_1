import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import SquareButton from '../../components/SquareButton'

const WantedShift = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>店名</Text>
        </View>
          <Text style={styles.titleText}>募集期間</Text>
          <View style={styles.listContainer}>
          <TextInput style={styles.inputTime}/>
          <Text style={styles.listInnerText}>月</Text>
          <TextInput style={styles.inputTime}/>
          <Text style={styles.listInnerText}>日</Text>
        </View>
        <Text style={styles.listInnerText}>~</Text>
        <View style={styles.listContainer}>
          <TextInput style={styles.inputTime}/>
          <Text style={styles.listInnerText}>月</Text>
          <TextInput style={styles.inputTime}/>
          <Text style={styles.listInnerText}>日</Text>
        </View>
        <View style={styles.rowContainer}>
          <SquareButton text='一時保存' buttonColor='#2299ff' textColor='white' />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  titleText: {
    fontSize: 32,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    paddingVertical: 16
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12
  },
  listInnerText: {
    fontSize: 38,
    textAlign: 'center',
    marginHorizontal: 10
  },
  inputTime: {
    width: 50,
    height: 50,
    fontSize: 32,
    borderWidth: 1,
    borderColor: '#0000ff',
    textAlign: 'center',
    padding: 4,
    margin: 4
  }
})

export default WantedShift

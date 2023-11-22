import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, useNavigation } from 'expo-router'

const handlePress = (): void => {
  router.push('shift/home')
}
const SubmitShift = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.SafeArea}>
      <View>
        <Text style={styles.title}>募集中のシフト</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.acceptingShiftList}>
          <Text style={styles.acceptingShiftListText}>1/1 ~ 1/15 未提出 ＞</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 18
  },
  acceptingShiftList: {
    backgroundColor: '#ff0000'
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 18,
    paddingHorizontal: 10
  },
  acceptingShiftListText: {
    fontSize: 18,
    textAlign: 'center'
  }
})

export default SubmitShift

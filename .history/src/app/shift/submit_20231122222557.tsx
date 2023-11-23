import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { router, useNavigation } from 'expo-router'

const handlePress = (): void => {
  router.push('shift/submit_form')
}
const SubmitShift = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.SafeArea}>
      <View>
      <Text style={styles.title}>店舗名</Text>
      <Text style={styles.subTitle}>募集中のシフト</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.acceptingShiftList} onPress={handlePress}>
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
    marginBottom: 12
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 8,
    marginBottom: 12
  },
  acceptingShiftList: {
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 18,
    paddingHorizontal: 10
  },
  acceptingShiftListText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center'
  }
})

export default SubmitShift

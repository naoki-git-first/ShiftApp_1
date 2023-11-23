import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { router, useNavigation } from 'expo-router'
import List from '../../components/List'

const handlePress = (): void => {
  router.push('shift/submit_form')
}
const SubmitShift = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.topBrock}>
        <Text style={styles.title}>店舗名</Text>
        <Text style={styles.subTitle}>募集中のシフト</Text>
      </View>
      <View>
        <List text='1/1 ~ 1/15 　未提出' onPress={handlePress}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  topBrock: {
    backgroundColor: '#dd2222',
    borderBottomWidth: 1,
    borderColor: '#dddddd'
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
    fontSize: 18,
    textAlign: 'center'
  }
})

export default SubmitShift

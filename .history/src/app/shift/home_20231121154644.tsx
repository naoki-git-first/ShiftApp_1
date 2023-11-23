import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const checkShift = (): void => {
  router.push('shift/check')
}
const submitShift = (): void => {
  router.push('shift/submit')
}
const editShift = (): void => {
  router.push('shift/edit')
}
const other = (): void => {
  router.push('shift/other')
}

const Home = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.checkShift}>
          <TouchableOpacity onPress={checkShift}>
            <Text>シフト確認</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitShift}>
          <TouchableOpacity onPress={submitShift}>
            <Text>シフト提出</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editShift}>
          <TouchableOpacity onPress={editShift}>
            <Text>シフト編集</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.other}>
          <TouchableOpacity onPress={other}>
            <Text>その他</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fffffff'
  },
  container: {
    flex: 1
  },
  checkShift: {
    flex: 1,
    backgroundColor: '#ff0000',
    fontSize: 34,
    paddingVertical: 24,
    paddingHorizontal: 8
  },
  submitShift: {
    flex: 1,
    backgroundColor: '#00ff00',
    fontSize: 34,
    paddingVertical: 24,
    paddingHorizontal: 8
  },
  editShift: {
    flex: 1,
    backgroundColor: '#0000ff',
    fontSize: 34,
    paddingVertical: 24,
    paddingHorizontal: 8
  },
  other: {
    flex: 1,
    backgroundColor: '#ffff00',
    fontSize: 34,
    paddingVertical: 24,
    paddingHorizontal: 8
  }
})

export default Home
